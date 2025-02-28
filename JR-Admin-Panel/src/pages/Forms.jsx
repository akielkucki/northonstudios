import React, { useState } from 'react';
import styled from 'styled-components';
import Loader from '../components/Loader';
import { useGetFormsDetailsQuery, useGetSingleFormDetailsQuery } from '../RTK/ApiRequests';

const Forms = () => {
  const [page, setPage] = useState(1);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const { data, isLoading, isError } = useGetFormsDetailsQuery({ page });
  const {
    data: singleFormDetails,
    isLoading: isSingleLoading,
    isError: isSingleError,
  } = useGetSingleFormDetailsQuery({form_Id: selectedFormId}, {
    skip: !selectedFormId
  });
  const closeModal = () => setSelectedFormId(null);

  if (isLoading || isError) {
    return <Loader />;
  }

  const { contacts } = data?.data;

  return (
    <Wrapper>
      <div className="main">
        <h1>Total Contact Forms</h1>
        <div className="head">
          <div className="cards">
            <div
              className="card"
              style={{ backgroundColor: '#0056b3', color: '#fff' }}
            >
              <h3>
                Total Forms <i className="fa fa-server"></i>
              </h3>
              <span>
                {data?.data?.fullLength}{' '}
                {data?.data?.fullLength > 1 ? 'Forms' : 'Form'}
              </span>
            </div>
          </div>
        </div>
        <div className="table">
          <div className="pagination">
            <button
              onClick={() => setPage(page === 1 ? page : page - 1)}
              disabled={page === 1}
              style={{ cursor: page === 1 ? 'not-allowed' : 'pointer' }}
            >
              {'<'}
            </button>
            <span>
              Page {page} of {Math.ceil(data?.data?.fullLength / 20)}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === Math.ceil(data?.data?.fullLength / 20)}
              style={{
                cursor:
                  page === Math.ceil(data?.data?.fullLength / 20)
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              {'>'}
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Business Name</th>
                <th>Phone</th>
                <th>Submitted At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts?.map((currElem) => (
                <tr key={currElem?.form_Id}>
                  <td>{currElem?.businessName}</td>
                  <td>{currElem?.phone}</td>
                  <td>{currElem?.createdAt?.slice(0, 10)}</td>
                  <td>
                    <button
                      className="viewBtn"
                      onClick={() => setSelectedFormId(currElem.form_Id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedFormId && (
        <Modal>
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            {isSingleLoading && <Loader />}
            {isSingleError && <p>Failed to load form details.</p>}
            {singleFormDetails && (
              <div>
                <h2>Form Details</h2>
                <p><strong>Business Name:</strong> {singleFormDetails?.data?.contact?.businessName}</p>
                <p><strong>First Name:</strong> {singleFormDetails?.data?.contact?.firstName}</p>
                <p><strong>Last Name:</strong> {singleFormDetails?.data?.contact?.lastName}</p>
                <p><strong>Email:</strong> {singleFormDetails?.data?.contact?.email}</p>
                <p><strong>Phone:</strong> {singleFormDetails?.data?.contact?.phone}</p>
                <p className='message'><strong>Message:</strong> {singleFormDetails?.data?.contact?.message}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
width: 100%;
height: 100vh;

  hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .main {
    width: 100%;height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  h1 {
    font-size: 3rem;
    font-weight: 600;
    padding: 10px 0px;
    font-family: Poppins, sens-serif;
    padding: 1rem;
  }

  .head {
    display: flex;
    flex-direction: row;
    padding: 1rem;

    .cards {
      display: flex;
      flex-direction: row;
      gap: 2rem;
      flex-wrap: wrap;
      width: 100%;

      .card {
        width: 20rem;
        height: fit-content;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
        background-color: #fffdfd;
        border-radius: 1rem;
        color: #000;
        box-shadow: 3px 2px 5px 2px gainsboro;
        
          h3{
            font-family: Poppins, sens-serif;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          span {
            font-size: 2rem;
            font-weight: bold;
            font-family: Poppins, sens-serif;
          }
      }
    }
  }

  .table {
    padding: 1rem;

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background-color: #fefefe;
    }

    th, td {
      padding: 8px;
      text-align: left;
      font-size: 1.5rem;
      font-family: Poppins, sens-serif;

      .viewBtn {
        border: none;
        color: #fff;
        background-color: #0056b3;
        padding: 0.5rem;
        border-radius: 0.5rem;
        margin-right: 2px;
        cursor: pointer;
        font-family: Poppins, sens-serif;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }

    th {
      background-color: #f2f2f2;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    align-items: center;

    button {
      margin-left: 10px;
      padding: 5px 10px;
      cursor: pointer;
      border: none;
      color: #0056b3;
      font-weight: bold;
    }

    span {
      margin: 0 10px;
      font-size: 1.4rem;
    }
  }
`;



const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    position: relative;

    .message {
      white-space: break-spaces;
    }

    div {
      display: flex;
      flex-direction: column;

      p {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
`;

export default Forms;
