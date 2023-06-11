import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import Link from 'next/link';

interface HeaderComponentProps {
    post: {
        description: string;
        image: string;
        imageText: string;
        linkText: string;
        title: string;
    };
}

export default function HeaderComponent(props: HeaderComponentProps) {
    const { post } = props;

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${post.image})`,
                borderRadius: 2,
                overflow: 'hidden'
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.7)',
                }}
            />
            <Grid container>
                <Grid item md={8}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="h6" color="inherit" paragraph>
                            {post.description}
                        </Typography>
                        <Link href="#products" style={{ textDecoration: 'none' }}>
                            <Button size="large" color='primary' variant="contained" endIcon={<ArrowForwardTwoToneIcon />}>
                                {post.linkText}
                            </Button>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}