"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Download, MoreHorizontal, Printer } from "lucide-react";
import * as React from "react";

import { Button } from "@common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@common/components/ui/dropdown-menu";
import { Input } from "@common/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@common/components/ui/table";
import { useEffect } from "react";

export function DataTable({
  data,
  columns,
  rowCount,
  selectionFunc = () => { },
  onNext = () => { },
  onPrev = () => { },
  onChangeLimit = () => { },
}) {
  // Validate input data
  if (!columns || !Array.isArray(columns) || columns.length === 0) {
    return null;
  }

  // State management
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });


  // Table configuration
  const table = useReactTable({
    data,
    columns,
    rowCount,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    // return selected rows to parent component, for each selection row find the original row and values
    selectionFunc(
      table.getFilteredSelectedRowModel().rows.map((row) => {
        const originalRow = row.original;
        return {
          ...originalRow,
          values: row.getVisibleCells().map((cell) => cell.value),
        };
      })
    );
  }, [rowSelection]);


  // Print functionality
  const handlePrint = React.useCallback(() => {
    alert("Todo Print");
  }, [table]);

  // CSV Download functionality
  const handleDownloadCSV = React.useCallback(() => {
    // Extract header names
    const headers = table.getHeaderGroups()[0].headers.map(
      header => header.column.columnDef.header || header.column.id
    );

    // Extract row data
    const rows = table.getRowModel().rows.map(row =>
      row.getVisibleCells().map(cell => {
        // Convert cell value to string, handling potential nested objects
        const value = cell.renderValue();
        return typeof value === 'object'
          ? JSON.stringify(value)
          : value;
      })
    );

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [table]);

  return (
    <div className="w-full text-base-content">
      <div className="flex items-center py-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Filter by..."
            value={!selectedFilter ? '' : table.getColumn(selectedFilter)?.getFilterValue() ?? ""}
            onChange={(event) =>
              !selectedFilter ? '' : table.getColumn(selectedFilter)?.setFilterValue(`${event.target.value}`)
            }
            className="max-w-sm"
          />
          {/* Select Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto text-base-content bg-base-100 capitalize"
              >
                {selectedFilter || 'Filter'} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="text-base-content bg-base-100"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanFilter())
                .map((column) => {
                  if (column.excludeFromFilter) return null;
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      className="capitalize"
                      onClick={() => setSelectedFilter(column.id)}
                    >
                      {column.id}
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <select
            value={pagination.pageSize}
            className="ml-auto text-base-content bg-base-100 select select-bordered select-sm"
            onChange={e => {
              const newPageSize = Number(e.target.value);
              onChangeLimit(newPageSize);
              setPagination(prev => ({
                ...prev,
                pageSize: newPageSize,
                pageIndex: 0
              }));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>

          {/* Print and Download Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrint}
              title="Print Table"
              className="text-base-content bg-base-100"
            >
              <Printer className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownloadCSV}
              title="Download CSV"
              className="text-base-content bg-base-100"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Select Columns */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto text-base-content bg-base-100"
            >
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="text-base-content bg-base-100"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* MAIN TABLE */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-base-content/10">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-base-cont font-bold uppercase ">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={"hover:bg-base-content/10"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="ml-auto text-base-content bg-base-100"
            onClick={() => {
              table.previousPage()
              onPrev();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto text-base-content bg-primary"
            onClick={() => {
              table.nextPage();
              onNext();
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}