import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Content } from './components/content';
import { Footer } from './components/footer';
import { Header } from './components/header';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Read} from './components/Read';
import { Create } from './components/create';

import Users from './components/Users'; // Corrected import

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Edit } from './components/edit';
import Search from './components/search';

class App extends React.Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto"><img src="./Images/HandyBros.png" alt="HandyBros.png" />
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/read">TradesMen list</Nav.Link>
              <Nav.Link href="/create">Create Tradesman</Nav.Link>
              <Nav.Link href="/Users">Login OR Create</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      <Routes>
        <Route path='/' element={<Content></Content>}></Route>
        <Route path='/Read' element={<Read></Read>}></Route>
        <Route path='/create' element={<Create></Create>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>
        <Route path='/Users' element={<Users></Users>}></Route>
      </Routes>
        {/* <Header></Header>
        <Content></Content>
        <Footer></Footer> */}
      </div>
      </Router>
    );
  }
}

export default App;
