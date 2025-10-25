import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import LoadingComponent from "../../components/LoadingComponent";
import SnackAlert from "../../components/SnackAlert";

import { useLoginMutation } from "../../services/login";

import secureStorage from "../../helper/secureStorage";
import { useDispatch } from "react-redux";
import { setTheme } from "../header/headerSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        sx={{
          color: "#fff",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
        href="/"
        onClick={(e) => e.preventDefault()}
      >
        Exam Portal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, loginResponse] = useLoginMutation();
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login({
        username: values.username,
        password: values.password,
      })
        .unwrap()
        .then((res) => {
          dispatch(setTheme(res.isDarkTheme ? "dark" : "light"));
          secureStorage.setItem("data", res);
          navigate("/dashboard");
        })
        .catch((err) => {
          setSnack({
            open: true,
            message: err.data?.message || err.data,
            severity: "error",
          });
        });
    },
  });
  const [visible, setVisible] = React.useState(false);
  const handleSetVisibility = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <Box
      sx={{
        p: 1,
        background: (theme) => theme.palette.primary.light,
        height: "100vh",
        minHeight: "600px",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
            px: 3,
            boxShadow: (theme) => theme.shadows[5],
          }}
          component={Paper}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              variant="standard"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={visible ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleSetVisibility}>
                      {visible ? <VisibilityOffIcon /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4, color: "#fff" }} />
      </Container>
      <LoadingComponent open={loginResponse.isLoading} />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </Box>
  );
}
