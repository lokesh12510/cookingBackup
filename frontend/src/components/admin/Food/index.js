import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

import * as foodService from "../services/foodService";
import url from '../url';
import DataTable from "../../ui/DataTable";
import * as SweetAlert from "../../ui/SweetAlert";
import Search from "./search";
import CheckAccess from '../Auth/checkAccess';
import { useSelector } from "react-redux";

export const Index = () => {
  const navigate = useNavigate();
  
  // DataTable
  const [tableValues, setTableValues] = useState({
    data: [],
    processing: true,
    totalRows: 0,
    page: 1,
    perPage: 10,
    filterText: '',
    search: {},
  });
  const authState = useSelector((state) => state.auth);
  const [chefNames,setChefNames]=useState('');

  const columns = [
    {
      name: '#',
      //selector: (row, index) => row.id,
      selector: (row, index) => index + 1 + (tableValues.perPage * (tableValues.page - 1)),
      grow: 0,
      sortable: true,
    },
    {
      name: 'Food Name',
      selector: row => row.food_name,
      sortable: true,
    },
    {
      name: 'Food Type',
      selector: row => row.food_type ? row.food_type.type : '--',
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => ((row.status!=null)?((row.status==1)?'Active':'InActive'):''),
      sortable: true,
    },
  
    {
      name: 'Actions',
      cell: row => ([
        <CheckAccess request={['ROLE_ADMIN', 'ROLE_CHEF']}>
          <FaRegEdit variant="secondary" className="editicon" onClick={() => editFood(row.id)} />
        </CheckAccess>,
        <CheckAccess request={['ROLE_ADMIN', 'ROLE_CHEF']}>
          <FaRegTrashAlt variant="primary" className="deleteicon" onClick={() => deleteFood(row.id)} />
        </CheckAccess>,
      ]),
      width: '20%',
    },
  ];

  useEffect(()=>{
    if(authState.user.role=='ROLE_ADMIN')
    {
      getChefNames();

    }

  },[]);

  useEffect(() => {
    
    getFoodList();
  }, [tableValues.page, tableValues.perPage, tableValues.filterText, tableValues.search]);

  const getFoodList = () => {
    const data = {
      page: tableValues.page,
      perPage: tableValues.perPage,
      filterText: tableValues.filterText,
    };
    Object.keys(tableValues.search).map((key) => {
      data[key] = tableValues.search[key];
    });
    if(authState.user.role=='ROLE_CHEF')
    {
    data['chef_id'] = authState.user.id;
    }

    setTableValues((prevState) => ({...prevState, ...{
      processing: true,
    }}));
    foodService.Index(data)
    .then((response) => {
      setTableValues((prevState) => ({...prevState, ...{
        processing: false,
        data: response.data.list,
        totalRows: response.data.total,
      }}));
    }).catch((e) => {
      console.log(e);
    });
  };

  // Actions
  const editFood = (id) => {
    navigate(`${url.FoodEdit}/${id}`);
  };
  const deleteFood = (id) => {
    SweetAlert.deleteConfirm().then((result) => {
      if(result.isConfirmed)
      {
        foodService.Delete(id)
        .then((response) => {
          getFoodList();
          SweetAlert.successAlert('Food deleted successfully');
        }).catch((e) => {
          console.log(e);
        });
      }
    });
  };

  const getChefNames =()=>
  {
    console.log('ff');
    if(authState.user.role=='ROLE_ADMIN')
    {
      foodService.chefNameList().then((response)=>{
        setChefNames(response.data);
      });
    }
  }


  return (
    <>
      <Container>
        <div className="card">
          <Row>
            <Col md={6}><h3>Food</h3></Col>
            <Col md={6} className="text-end">
              <CheckAccess request={['ROLE_CHEF']}>
                <Button variant="primary" onClick={() => navigate(url.FoodAdd)}>
                  Add
                </Button>
              </CheckAccess>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
              <Search 
                setData={(search) => {
                  setTableValues((prevState) => ({...prevState, ...{
                    search: search,
                  }}));
                }}
                getData={chefNames}
              />
            </Col>
        </Row>
        <Row>
          <Col md={12}>
            <DataTable
              columns={ columns }
              data={ tableValues.data }
              striped
              pagination
              paginationServer
              paginationTotalRows={ tableValues.totalRows }
              paginationDefaultPage={ tableValues.page }
              onChangePage={(newPage) => {
                setTableValues((prevState) => ({...prevState, ...{
                  page: newPage,
                }}));
              }}
              onChangeRowsPerPage={(newPerPage, newPage) => {
                setTableValues((prevState) => ({...prevState, ...{
                  page: newPage,
                  perPage: newPerPage,
                }}));
              }}
              subHeader
              progressPending={ tableValues.processing }      
            />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}