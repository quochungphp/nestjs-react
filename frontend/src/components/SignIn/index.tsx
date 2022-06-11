import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { GoogleLogin } from 'react-google-login';
import "./style.css";
import { googleAppClientId } from "../../utils/envs";
import { AuthSigninPayloadDto } from "../../domain";
import { postSignInByPassword } from "../../reduxStore/signin-request-by-password/action";
import { useDispatch, useSelector } from "react-redux";
import {serverApi} from "../../resources/server-api"
import { signInByPasswordSelector } from "../../reduxStore/signin-request-by-password/sliceReducer";
export const SignIn = () => {
  const dispatch = useDispatch();
  const initialState = useSelector(signInByPasswordSelector);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && password) {
      const payload: AuthSigninPayloadDto = {
        username,
        password,
      };
      dispatch(postSignInByPassword(payload));
    }
  };
  React.useEffect(() => {
    const accessToken = serverApi.getAccessToken();
    if (accessToken) {
      window.location.href = '/';
    }
  }, []);
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "680px",
        border: "2px solid #ff6a3d",
        padding: "50px",
        borderRadius: "20px",
        marginTop: "10px",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="img" sx={{}} alt="viACT" src="mainLogoLogin.svg" />
        <Typography component="h1" variant="h5" mb={1}>
          Login
        </Typography>
        <Typography
          component="h4"
          variant="h5"
          sx={{ color: "#ff6a3d" }}
          mb={1}
        >
          Welcome Back
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Grid container>
              <Grid item xs>
                <FormControlLabel
                  control={<Checkbox value="showPassword" color="primary" />}
                  label="Show password"
                  className="textSubColor"
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  control={
                    <Link
                      href="users/forgot-password"
                      color="primary"
                      mt={5}
                      style={{ flex: 1 }}
                    />
                  }
                  label="Forgot password"
                  className="textSubColor"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 1,
                background: "#afa8a8",
                height: "50px",
                verticalAlign: "center",
              }}
              size="large"
            >
              Sign In
            </Button>
            <Grid item xs={12} mb={2}>
              <Typography className="textSubColor" textAlign={"center"}>
                OR
              </Typography>
            </Grid>
            <GoogleLogin
              style={{
                marginTop: '1cm'
              }}
              clientId={googleAppClientId}
              buttonText="Sign in With Google"
              // onSuccess={responseGoogle}
              // onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className="btn-google"
            />

            <Grid item xs={12}>
              <Typography className="textSubColor" textAlign={"center"}>
                "Not on Viact yet?
                <Link href="#" variant="body2" className="textSubColor">
                  <b>{"Sign Up"}</b>
                </Link>{" "}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
