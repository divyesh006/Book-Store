import React, { useEffect, useMemo, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { productListingStyle } from "./style";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
} from "@material-ui/core";
import { useAuthContext } from "../../context/auth";
import { toast } from "react-toastify";
import Shared from "../../utils/shared";
import { useCartContext } from "../../context/cart";
import { defaultFilter } from "../../constant/constant";
import bookService from "../../service/book.service";
import categoryService from "../../service/category.service";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../../State/Slice/cartSlice";



const BookList = () => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const classes = productListingStyle();
  const materialClasses = materialCommonStyles();
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [filters, setFilters] = useState(defaultFilter);
  const authData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookResponse(res);
    });
  };

  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    if (bookList) {
      bookList.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.categoryId
        )?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookResponse]);

  const addToCart = (book) => {
    Shared
      .addToCart(book, authData.id)
      .then((res) => {
        if (res.error) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
          dispatch(fetchCartData(authData.id));
          // dispatch(addtoCart(book)); // Dispatch the addToCart action
        }
      })
      .catch((err) => {
        toast.warning(err);
      });
  };
  const sortBooks = (e) => {
    setSortBy(e.target.value);
    let bookList = [...bookResponse.items];
    if (e.target.value === "a-z") {
      bookList.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (e.target.value === "z-a") {
      bookList.sort((a, b) => b.name.localeCompare(a.name));
    }
    setBookResponse({ ...bookResponse, items: bookList });
  };

  return (
    <div className={classes.productListWrapper}>
      <div className="container">
        <Typography variant="h1">Book Listing</Typography>
        <Grid container className="title-wrapper">
          <Grid item xs={6}>
            <Typography variant="h2">
              Total
              <span> - {bookResponse.totalItems} items</span>
            </Typography>
          </Grid>
          <div className="dropdown-wrapper">
            <TextField
              id="text"
              className="dropdown-wrapper"
              name="text"
              placeholder="Search..."
              variant="outlined"
              inputProps={{ className: "small" }}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                  pageIndex: 1,
                });
              }}
            />
          </div>
          <FormControl className="dropdown-wrapper" variant="outlined">
            <InputLabel htmlFor="select">Sort By</InputLabel>
            <Select
              className={materialClasses.customSelect}
              MenuProps={{
                classes: { paper: materialClasses.customSelect },
              }}
              onChange={sortBooks}
              value={sortBy}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <div className="product-list-wrapper">
          <div className="product-list-inner-wrapper">
            {books.map((book, index) => (
              <div className="product-list" key={index}>
                <div className="product-list-inner">
                  <em>
                    <img
                      src={book.base64image}
                      className="image"
                      alt="dummyimage"
                    />
                  </em>
                  <div className="content-wrapper">
                    <Typography variant="h3">{book.name}</Typography>
                    <span className="category">{book.category}</span>
                    <p className="description">{book.description}</p>
                    <p className="price">
                      <span className="discount-price">
                        MRP &#8377; {book.price}
                      </span>
                    </p>
                    <button
                      className="MuiButtonBase-root MuiButton-root MuiButton-contained btn pink-btn MuiButton-containedPrimary MuiButton-disableElevation"
                      disabled={cartContext.cartData.some(
                        (item) => item.book.id === book.id
                      )}
                      onClick={() => addToCart(book)}
                    >
                      <span className="MuiButton-label">
                        {cartContext.cartData.some(
                          (item) => item.book.id === book.id
                        )
                          ? "Already Added"
                          : "Add to Cart"}
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination-wrapper">
          <Pagination
            count={bookResponse.totalPages}
            page={filters.pageIndex}
            onChange={(e, newPage) => {
              setFilters({ ...filters, pageIndex: newPage });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookList;
