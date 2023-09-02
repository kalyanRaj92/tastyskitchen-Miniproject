import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

import CartContext from '../../context/CartContext'

class Header extends Component {
  state = {
    ShowHamburger: false,
  }

  onShowNavMenu = () => {
    this.setState(prevState => ({
      ShowHamburger: !prevState.ShowHamburger,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        console.log(cartItemsCount)
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {activeTab} = this.props
    const {ShowHamburger} = this.state
    const activeHome = activeTab === 'HOME' ? 'active' : ''
    const activeCart = activeTab === 'CART' ? 'active' : ''
    const activeProfile = activeTab === 'PROFILE' ? 'active' : ''

    return (
      <>
        <nav className="nav-header">
          <div className="nav-content">
            <Link to="/" className="heading-link">
              <div className="header-logo-content">
                <img
                  className="header-website-logo"
                  src="https://res.cloudinary.com/dfzzwbmcq/image/upload/v1635771529/Group_7420_p9exzb_otapjk.png"
                  alt="website logo"
                />
                <h1 className="header-heading">Tasty Kitchens</h1>
              </div>
            </Link>
            <GiHamburgerMenu
              className="hamburger"
              size={25}
              onClick={this.onShowNavMenu}
            />
          </div>
          <ul className="nav-menu">
            <Link to="/" className={`nav-link ${activeHome}`}>
              <li>Home</li>
            </Link>
            <Link to="/profile" className={`nav-link ${activeProfile}`}>
              <li>Profile</li>
            </Link>
            <Link to="/cart" className={`nav-link ${activeCart}`}>
              <li>Cart {this.renderCartItemsCount()}</li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={this.onClickLogout}
            data-testid="logout-button"
          >
            Logout
          </button>
        </nav>
        {ShowHamburger && (
          <div className="mobile-nav-menu-options">
            <ul className="mobile-nav-menu">
              <Link to="/" className={`nav-link ${activeHome}`}>
                <li>Home</li>
              </Link>
              <Link to="/profile" className={`nav-link ${activeProfile}`}>
                <li>Profile</li>
              </Link>
              <Link to="/cart" className={`nav-link ${activeCart}`}>
                <li>Cart {this.renderCartItemsCount()}</li>
              </Link>
            </ul>
            <button
              type="button"
              className="logout-mobile-btn"
              onClick={this.onClickLogout}
              data-testid="logout-button"
            >
              Logout
            </button>
            <button className="nav-delete-button" type="button">
              <AiFillCloseCircle color="#616E7C" size={25} />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
