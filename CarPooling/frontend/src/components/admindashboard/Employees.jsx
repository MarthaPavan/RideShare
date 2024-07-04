import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import './styles.css'; // Import your custom CSS for additional styling

const Employees = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1000/routes/getDriver", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [token]);

  const handleClick = (id) => {
    console.log(id);
  };

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "fullName",
    },
    {
      Header: "Email",
      accessor: "emailId",
    },
    {
      Header: "Phone",
      accessor: "phoneNumber",
    },
    {
      Header: "Registration Number",
      accessor: "registrationNumber",
    },
    {
      Header: "Vehicle Type",
      accessor: "vehicleModel",
    },
    {
      Header: "Status",
      accessor: "isVerified",
      Cell: ({ value }) => (value ? 'Verified' : 'Not Verified'),
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const rowCount = data.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min(rowCount, startRow + pageSize - 1);

  return (
    <div className='min-vh-100 mt-5'>
    <div className='container flex-column justify-content-center align-content-center m-2 table-container'>
      <h1><i className="fa-regular fa-address-book"></i> Employees List</h1>
      <Table responsive bordered hover {...getTableProps()}>
        <thead className='thead-dark'>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(header => (
                <th
                  {...header.getHeaderProps(header.getSortByToggleProps())}
                  style={{ cursor: "pointer" }}
                >
                  {header.render('Header')}
                  {header.isSorted
                    ? header.isSortedDesc
                      ? '🔽'
                      : '🔼'
                    : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr key={row.id} onClick={() => handleClick(row.original._id)} className='table-row'>
                {row.cells.map(cell => (
                  <td key={cell.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
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
    </div>
    </div>
  );
};

export default Employees;
