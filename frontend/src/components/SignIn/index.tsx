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
import "./style.css";
export const SignIn = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
          marginTop: 3,
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <Grid item xs={12}>
              <Typography className="textSubColor" textAlign={"center"}>
                OR
              </Typography>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                background: "red",
                height: "50px",
                verticalAlign: "center",
              }}
              size="large"
            >
              Google
            </Button>

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
