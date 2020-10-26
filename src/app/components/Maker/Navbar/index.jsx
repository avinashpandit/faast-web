import React, { Fragment } from 'react'
import {
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
} from 'reactstrap'
import { Link, NavLink as RouterNavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setDisplayName, compose, lifecycle } from 'recompose'
import { pick } from 'lodash'
import classNames from 'class-names'
import config from 'Config'
import { isMakerLoggedIn } from 'Selectors/maker'
import withToggle from 'Hoc/withToggle'
import { useAuth0 } from '@auth0/auth0-react'
import { makerLogout } from 'Actions/maker'

import Icon from 'Components/Icon'
import FaastLogo from 'Img/faast-logo.png'

import { navbar, navbarBrand, navbarLink, active } from './style'

const MakersNavBar = ({ loggedIn, children, isExpanded, toggleExpanded, hasAcceptedTerms, clickableLogo, ...props }) => {
  const { logout } = useAuth0()
  return (
    <Navbar className={navbar} {...pick(props, Object.keys(Navbar.propTypes))} dark>
      <Container>
        <NavbarBrand tag={clickableLogo ? Link : 'span'} to={loggedIn ? '/makers/dashboard' : '/makers/login'} className={classNames(navbarBrand, !loggedIn ? 'mx-auto' : 'mr-auto')}>
          <Icon src={FaastLogo} height='1.5rem' width='1.5rem' inline className='mx-3'/>
          <span className='text-white'>Faa.st | <span style={{ fontSize: 16 }}>Makers</span></span>
        </NavbarBrand>
        {loggedIn && hasAcceptedTerms && (
          <Fragment>
            <NavbarToggler onClick={toggleExpanded}/>
            <Collapse isOpen={isExpanded} navbar>
              <Nav className='mx-auto' navbar>
                <NavItem key='dashboard'>
                  <NavLink className={classNames(navbarLink, 'px-1 px-lg-2')} activeClassName={active} tag={RouterNavLink} to='/makers/dashboard'>
                    <i style={{ top: 2 }} className='d-inline d-md-none d-lg-inline nav-link-icon fa fa-pie-chart position-relative'/>
                    <span className='ml-2 d-sm-inline'>Dashboard</span>
                  </NavLink>
                </NavItem>
                <NavItem key='swaps'>
                  <NavLink className={classNames(navbarLink, 'px-1 px-lg-2')} activeClassName={active} tag={RouterNavLink} to='/makers/swaps'>
                    <i style={{ top: 2 }} className='d-inline d-md-none d-lg-inline nav-link-icon fa fa-exchange position-relative'/>
                    <span className='ml-2 d-sm-inline'>Swaps</span>
                  </NavLink>
                </NavItem>
                <NavItem key='withdrawals'>
                  <NavLink className={classNames(navbarLink, 'px-1 px-lg-2')} activeClassName={active} tag={RouterNavLink} to='/makers/withdrawals'>
                    <i style={{ top: 2 }} className='d-inline d-md-none d-lg-inline nav-link-icon fa fa-history position-relative'/>
                    <span className='ml-2 nav-link-label d-sm-inline'>Withdrawals</span>
                  </NavLink>
                </NavItem>
                <NavItem key='docs'>
                  <NavLink className={classNames(navbarLink, 'px-1 px-lg-2')} activeClassName={active} tag='a' href='https://api.faa.st' target='_blank noopener noreferrer'>
                    <i style={{ top: 2 }} className='d-inline d-md-none d-lg-inline nav-link-icon fa fa-code position-relative'/>
                    <span className='ml-2 nav-link-label d-sm-inline'>Docs</span>
                  </NavLink>
                </NavItem>
                <NavItem key='settings'>
                  <NavLink className={classNames(navbarLink, 'px-1 px-lg-2')} activeClassName={active} tag={RouterNavLink} to='/makers/settings'>
                    <i style={{ top: 2 }} className='d-inline d-md-none d-lg-inline nav-link-icon fa fa-cog position-relative'/>
                    <span className='ml-2 nav-link-label d-sm-inline'>Settings</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            <div>
              <p onClick={() => logout({ returnTo: 'https://faa.st/app/makers/login' })} className={classNames(navbarLink, active, 'd-inline cursor-pointer mx-md-0 mx-3')}>
              Logout
              </p>
            </div>
          </Fragment>
        )}
      </Container>
      {children}
    </Navbar>
  )}

MakersNavBar.propTypes = {
  ...Navbar.propTypes
}

MakersNavBar.defaultProps = {
  color: 'light',
  dark: false,
  fixed: 'top',
  expand: config.navbar.expand,
}

export default compose(
  setDisplayName('MakersNavBar'),
  connect(createStructuredSelector({
    loggedIn: isMakerLoggedIn,
  }), {
    logoutMaker: makerLogout
  }),
  withToggle('expanded'),
  lifecycle({
    componentWillMount() {
      document.body.style.backgroundColor = '#f5f6fa'
    }
  })
)(MakersNavBar)