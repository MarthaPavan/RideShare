import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { Pagination } from 'react-bootstrap';
import mockData from '../../MOCK_DATA(1).json';
const Employees = () => {

    const [sorting, setSorting] = useState([]);
  const data = useMemo(
    //api call
    
  );

  /**@type import('@tanstack/react-table').ColumnDef<any>[] */
  const columns = useMemo(() => [
    
    {
      header: "Name",
      accessorKey: "fullName",
      cell: info => info.getValue()
    },
    {
      header: "Email",
      accessorKey: "emailId",
      cell: info => info.getValue()
    },
    {
      header: "Phone",
      accessorKey: "phone",
      cell: info => info.getValue()
    },
    {
      header: "Registration Number",
      accessorKey: "registrationNumber",
      cell: info => info.getValue()
    },
    {
      header: "Vehicle Type",
      accessorKey: "vehicleModel",
      cell: info => info.getValue()
    },
    {
      header: "Status",
      accessorKey: "isVerified",
      cell: info => (info.getValue() ? 'Verified' : 'Not Verified')
    }
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel:getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state : {
        sorting : sorting,
    },
    initialState: {
        pagination: {
          pageSize: 10,
          pageIndex: 0,
        }
      },
    onSortingChange: setSorting,

  });
  const { pageCount, pageIndex } = table.getState().pagination;
  return (
        <div className='container flex-column justify-content-center align-content-center'>
      <table className = "table table-striped table-bordered">
        <thead className='thead-dark'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}
                    style={{"cursor" : "pointer"}}
                    onClick={header.column.getToggleSortingHandler()}
                    >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {
                        { asc: '🔼', desc: '🔽' }[
                          header.column.getIsSorted() ?? null
                        ]
                    }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className='align-items-end'>
        <Pagination.First onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} />
        <Pagination.Prev onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
        {Array.from({ length: pageCount }, (_, i) => (
          <Pagination.Item key={i} active={i === pageIndex} onClick={() => table.setPageIndex(i)}>
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
        <Pagination.Last onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} />
      </Pagination>
    </div>
  );
};

export default Employees;
