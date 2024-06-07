import React, { useMemo, useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Routes = () => {
  const [sorting, setSorting] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();  // React Router navigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1000/routes/getRoute"); // Adjust URL as needed
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(() => [
    {
      header: "Route ID",
      accessorKey: "routeId",
      cell: info => info.getValue()
    },
    {
      header: "Start Point",
      accessorKey: "startPoint",
      cell: info => info.getValue()
    },
    {
      header: "End Point",
      accessorKey: "endPoint",
      cell: info => info.getValue()
    },
    {
      header: "Distance (km)",
      accessorKey: "distance",
      cell: info => `${info.getValue()} km`
    },
    {
      header: "Number of Drivers",
      accessorKey: "drivers",
      cell: info => info.getValue().length
    }
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      }
    },
    onSortingChange: setSorting,
  });

  const handleClick = (id) => {
    navigate(`/routes/${id}`);  // Navigate to RouteDetails with the selected route ID
  }

  const { pageCount, pageIndex } = table.getState().pagination;

  return (
    <div className='container flex-column justify-content-center align-content-center m-2 p-2'>
      <h3 className='display-6'><i className="fa-solid fa-map"></i> Routes</h3>
      <Table responsive bordered hover>
        <thead className='thead bg-dark text-white'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}
                    style={{ cursor: "pointer" }}
                    onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === 'asc'
                      ? '🔼'
                      : '🔽'
                    : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={() => handleClick(row.original._id)}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
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

export default Routes;
