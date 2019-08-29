import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <div className="header">
      <Helmet
        title={data.site.siteMetadata.title + "فروشگاه اینترنتی لوازم ورزشی"}
        meta={[
          { name: "description", content: "Sample" },
          { name: "keywords", content: "sample, something" },
        ]}
      >
        <html lang="fa" dir="rtl" />
        <base href="" />
      </Helmet>
      <nav className="navbar navbar-expand-md navbar-dark container py-2">
        <Link className="navbar-brand" to="">
          <img src="https://tinysports.ir/wp-content/uploads/2019/04/logo-2.png" width="90" alt="logo" />
        </Link>
        <input className="form-control mr-3" type="search" placeholder="جستجو..." aria-label="Search" />
          <ul className="navbar-nav pr-4">
            <li className="nav-item">
            <Link className="h3 py-0 m-0 text-light" to="/cart">
                <i className="fa fa-shopping-basket" aria-hidden="true"></i>
              </Link>
            </li>
            <li className="nav-item mr-3">
            <Link className="h3 py-0 m-0 text-light" to="/account">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
              </Link>
            </li>
          </ul>
      </nav>
      <div class="container mt-2 pr-4 pb-3 nav-links">
    <Link className="text-white px-3 py-1 mr-2" to="">پینگ پنگ</Link>
    <Link className="text-white px-3 py-1 mr-2" to="">بدمینتون</Link>
    <Link className="text-white px-3 py-1 mr-2" to="">بیلیارد و ایرهاکی</Link>
    <Link className="text-white px-3 py-1 mr-2" to="">فوتبال دستی</Link>
    <Link className="text-white px-3 py-1 mr-2" to="">توپ</Link>
    <Link className="text-white px-3 py-1 mr-2" to="">ساک و کوله</Link>
    <Link className="text-white px-3 py-1 mr-2" to="">باشگاه پینگ پنگ</Link>
</div>
    </div>
  )
}
export default Header
