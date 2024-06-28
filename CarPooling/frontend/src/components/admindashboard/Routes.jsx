import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Table, Pagination, Button } from 'react-bootstrap';
import axios from 'axios';
import RouteDetails from './RouteDetails';

const Routes = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(false);
  const [routeId, setRouteId] = useState(null); // Initial routeId set to null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1000/routes/getRoute");
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const columns = useMemo(() => [
    {
      Header: "Route ID",
      accessor: "_id", // Use _id instead of routeId
    },
    {
      Header: "Start Point",
      accessor: "startPoint",
    },
    {
      Header: "End Point",
      accessor: "endPoint",
    },
    {
      Header: "Distance (km)",
      accessor: "distance",
      Cell: ({ value }) => `${value} km`,
    },
    {
      Header: "Number of Drivers",
      accessor: "drivers",
      Cell: ({ value }) => value.length,
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page: rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const handleClick = (id) => {
    setRouteId(id);
    setPage(true);
  };

  const handleBackClick = () => {
    setPage(false); // Set page to false to display the list again
  };

  const rowCount = data.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min(rowCount, startRow + pageSize - 1);

  return (
    <div className='container flex-column justify-content-center align-content-center m-2 p-2'>
      <h3 className='display-6'><i className="fa-solid fa-map"></i> Routes</h3>
      {!page && (
        <>
          <Table responsive bordered hover {...getTableProps()}>
            <thead className='thead bg-dark text-white'>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} onClick={() => handleClick(row.original._id)}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center">
            <span>
              Showing {startRow} to {endRow} of {rowCount} entries
            </span>
            <Pagination className='align-items-end'>
              <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
              <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
              {pageOptions.map((page, index) => (
                <Pagination.Item key={index} active={pageIndex === index} onClick={() => gotoPage(index)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
              <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
            </Pagination>
          </div>
        </>
      )}
      {page && <RouteDetails id={routeId} />}
      {page && 
        <Button variant="primary" onClick={handleBackClick}>Back</Button>
      }
    </div>
  );
};

export default Routes;
