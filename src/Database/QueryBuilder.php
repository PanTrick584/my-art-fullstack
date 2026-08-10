<?php

declare(strict_types=1);

namespace App\Database;

use PDO;

class QueryBuilder
{
    private string $table;
    private array $wheres = [];
    private array $bindings = [];

    public function __construct(private PDO $pdo) {}

    public function table(string $table): self
    {
        $this->table = $table;
        $this->wheres = [];
        $this->bindings = [];

        return $this;
    }

    public function where(string $column, string $operator, mixed $value): self
    {
        $placeholder = 'where_' . count($this->bindings);
        $this->wheres[] = "{$column} {$operator} :{$placeholder}";
        $this->bindings[$placeholder] = $value;

        return $this;
    }

    public function get(): array
    {
        $sql = "SELECT * FROM {$this->table}" . $this->whereClause();

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($this->bindings);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function first(): ?array
    {
        return $this->get()[0] ?? null;
    }

    public function insert(array $data): int
    {
        $columns = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_map(fn($key) => ":{$key}", array_keys($data)));
        $sql = "INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders}) RETURNING id";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($data);

        return (int) $stmt->fetchColumn();
    }

    public function count(): int
    {
        $sql = "SELECT COUNT(*) FROM {$this->table}" . $this->whereClause();

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($this->bindings);

        return (int) $stmt->fetchColumn();
    }

    private function whereClause(): string
    {
        return $this->wheres === [] ? '' : ' WHERE ' . implode(' AND ', $this->wheres);
    }
}
