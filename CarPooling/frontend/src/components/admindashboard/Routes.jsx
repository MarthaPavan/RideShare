import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Table, Pagination, Button } from 'react-bootstrap';
import axios from 'axios';
import RouteDetails from './RouteDetails';
import './styles.css';
const Routes = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(false);
  const [routeId, setRouteId] = useState(null);
  const base_url = process.env.REACT_APP_BASE_URL | "http://localhost:3000";
  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/routes/getRoute`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(() => [
    {
      Header: "Route ID",
      accessor: "routeId",
    },
    {
      Header: "Pick Up Location",
      accessor: "pickUpLocation",
    },
    {
      Header: "Drop Location",
      accessor: "dropLocation",
    },
    {
      Header: "Date",
      accessor: "date",
      Cell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      Header: "Capacity",
      accessor: "capacity",
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
    setPage(false);
    fetchData(); // Refresh the data after returning to the list view
  };

  const rowCount = data.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min(rowCount, startRow + pageSize - 1);

  return (
    <div className='min-vh-100 mt-5'>
      <div className='table-container'>
        <h3 className='display-6 text-center'><i className="fa-solid fa-map"></i> Routes</h3>
        {!page && (
          <>
            <Table responsive bordered hover {...getTableProps()} className='text-center'>
              <thead className='table-header'>
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
                    <tr {...row.getRowProps()} onClick={() => handleClick(row.original.routeId)} className='table-row'>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="pagination-container">
              <span>
                Showing {startRow} to {endRow} of {rowCount} entries
              </span>
              <Pagination className='pagination'>
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
        {page && <RouteDetails id={routeId} onDelete={handleBackClick} />}
        {page &&
          <Button variant="primary" onClick={handleBackClick}>Back</Button>
        }
      </div>
    </div>
  );
};

export default Routes;
