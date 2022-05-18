import React from "react";
import  "./App.css";
import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";
import Button  from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Box from '@material-ui/core/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import ImageBox from "./components/ImageBox.js";
import { MdLogin } from "react-icons/md";

export default function App(){
    return(
        <Container component = "main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 200,
                    display: 'flex',
                    flexDirection:'column',
                    alignItems: 'center',
                }}
                >

                    <Typography 
                                component = "h1"
                                variant = "h5"
                                color = "Primary">
                        제주대학교 학과 게시판
                    </Typography>

                    <TextField
                        margin ="normal"
                        label = "학번"
                        required
                        fullWidth
                        name = "email"
                        autoComplete = "email"
                        autoFocus
                    />
                    <TextField
                        margin = "normal"
                        label = "비밀번호"
                        type = "password"
                        required 
                        fullWidth
                        name = "password"
                        autoComplete="current-password"
                    />
                    <Grid container>
                        <Grid item xs={12}>
                            <Button type = "submit" fullWidth variant = "contained"
                            sx={{mt:3, mb:2}}>
                                로그인
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link href ="#" variant = "body2">
                                        비밀번호 찾기
                                    </Link>
                                </Grid>

                                <Grid item>
                                    <Link href ="#" variant = "body2">
                                        회원가입
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Box>
            </Container>
    );
}