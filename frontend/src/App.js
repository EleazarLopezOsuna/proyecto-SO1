import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Swal from 'sweetalert2';

export default function App() {
    const [platforms, setPlatforms] = useState();
    const [coins, setCoins] = useState();
    const [products, setProducts] = useState();

    const [purchaseOriginPlatform, setPurchaseOriginPlatform] = useState(0);
    const [purchaseDestinyPlatform, setPurchaseDestinyPlatform] = useState(0);
    const [purchaseCoinId, setPurchaseCoinId] = useState(0);
    const [purchaseProduct, setPurchaseProduct] = useState(0);
    const [purchaseQuantity, setPurchaseQuantity] = useState(0);

    const handleInputChange = (e) => {
        switch(e.target.name){
            case 'purchaseProduct':
                products.each(element => {
                    if(element['productId'].toString() === e.target.value){
                        setPurchaseDestinyPlatform(element['platformId']);
                        setPurchaseProduct(element['productId']);
                    }
                })
                break;
            case 'purchaseOriginPlatform':
                setPurchaseOriginPlatform(e.target.value);
                break;
            case 'purchaseCoinId':
                setPurchaseCoinId(e.target.value);
                break;
            case 'purchaseQuantity':
                setPurchaseQuantity(e.target.value);
                break;
            default:
                break;
        }
    }

    const getPlatforms = async () => {
        await axios.post('http://localhost:4000', {
            "data": {},
            "type": "get",
            "endpoint": "platforms"
        })
            .then(response => {
                setPlatforms(response.data);
                if(response.data.length > 0){
                    getCoins(response.data[0]['platformId']).then(() => {});
                    getProducts(response.data[0]['platformId']).then(() => {});
                    setPurchaseOriginPlatform(response.data[0]['platformId']);
                }
            })
            .catch( () => {
                console.log('There has been an error getting the platforms');
            });
    }

    const getCoins = async (id) => {
        await axios.post('http://localhost:4000', {
            "data": {},
            "type": "get",
            "endpoint": "coins/" + id
        })
            .then(response => {
                setCoins(response.data);
                if(response.data.length > 0){
                    setPurchaseCoinId(response.data[0]['coinId']);
                }
            })
            .catch( () => {
                console.log('There has been an error getting the coins');
            });
    }

    const getProducts = async (id) => {
        await axios.post('http://localhost:4000', {
            "data": {},
            "type": "get",
            "endpoint": "products/" + id
        })
            .then(response => {
                setProducts(response.data);
                if(response.data.length > 0){
                    setPurchaseDestinyPlatform(response.data[0]['platformId']);
                    setPurchaseProduct(response.data[0]['productId']);
                }
            })
            .catch( () => {
                console.log('There has been an error getting the products');
            });
    }

    const handleOriginChange = (e) => {
        getCoins(e.target.value).then(() => {});
        getProducts(e.target.value).then(() => {});
        setPurchaseOriginPlatform(e.target.value);
    }

    const handlePurchase = async () => {
        const transactionData = {
            purchaseOriginPlatform,
            purchaseDestinyPlatform,
            purchaseCoinId,
            purchaseProduct,
            purchaseQuantity
        }

        await axios.post('http://localhost:4000', {
            "data": transactionData,
            "type": "post",
            "endpoint": "purchases"
        })
            .then( () => {
                Swal.fire("Success", "Purchase was made successfully", "success").then( () => {
                    window.location.href="/";
                })
            })
            .catch( () => {
                Swal.fire("Error", "Error while making purchase", "error").then(() => {})
            })
    }

    useEffect(() => {
        getPlatforms().then(() => {});
    }, [])

  return (
      <div
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
          }}
      >
          <Row className="justify-content-md-center">
              <Col>
                  <Form>
                      <Row className={ 'mb-3' }>
                          <Form.Group className="mb-3" controlId="formBasicPlatform">
                              <Form.Label>Platform</Form.Label>
                              <Form.Select onChange={handleOriginChange} name={'purchaseOriginPlatform'} onLoad={handlePurchase}>
                                  {
                                      platforms !== undefined && (
                                          platforms.map((element) => (
                                              <option value={element['platformId']} >{element['platformName']}</option>
                                          ))
                                      )
                                  }
                              </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicCoin">
                              <Form.Label>Coin</Form.Label>
                              <Form.Select name={'purchaseCoinId'} onChange={handleInputChange}>
                                  {
                                      coins !== undefined && (
                                          coins.map((element) => (
                                              <option value={element['coinId']} >Coin balance: { element['coinBalance'] }</option>
                                          ))
                                      )
                                  }
                              </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicProduct">
                              <Form.Label>Product</Form.Label>
                              <Form.Select onChange={handleInputChange} name={'purchaseProduct'}>
                                  {
                                      products !== undefined && (
                                          products.map((element) => (
                                              <option value={element['productId']} >{ element['platformName'] }: {element['productName']} - Q{element['productPrice']}</option>
                                          ))
                                      )
                                  }
                              </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicAmount">
                              <Form.Label>Amount</Form.Label>
                              <Form.Control
                                  type="number"
                                  placeholder="Amount"
                                  name={"purchaseQuantity"}
                                  onChange={handleInputChange}
                                  required
                              />
                          </Form.Group>
                          <Form.Group>
                              <Button variant="primary" onClick={() => handlePurchase()}>
                                  Guardar
                              </Button>
                          </Form.Group>
                      </Row>
                  </Form>
              </Col>
          </Row>
      </div>
  );
}