import * as React from 'react';
import {
    Grid,
    Card,
    CardMedia,
    Typography,
    Container,
    Dialog,
    Toolbar,
    IconButton,
    styled
} from '@mui/material';
import Slider from "react-slick";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TestimonialModel } from '@/models/testimonial';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const DialogFullScreenImage = styled(Dialog)(
    () => `
      .MuiDialog-paperFullScreen {
        background-color: rgba(0,0,0,0.25)
      }
  `
)

const ImageSrc = styled('img')(
    () => `
      max-height: 100%;
      max-width: 100%;
  `
)


const CardTestimonial = (props) => {

    const { item, showImage } = props

    return (
        <Grid
            item
            key={item.title}
            xs={12}
            sm={item.title === 'Enterprise' ? 12 : 6}
            md={4}

            sx={{
                // maxHeight: 450,
                p: 1
            }}
        >
            <Card onClick={() => showImage()} sx={{ cursor: 'pointer' }}>
                <CardMedia
                    component="img"
                    height="450"
                    image={item.image}
                    alt={item.name}
                />
            </Card>
        </Grid>
    )

}


function TestimonialsContent(props) {
    const { items } = props

    const [openImage, setOpenImage] = React.useState<boolean>(false)
    const [selectedImage, setSelectedImage] = React.useState<TestimonialModel>()

    const handleCloseImage = () => {
        setOpenImage(false)
        setSelectedImage(null)
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        slidesToShow: items.length > 3 ? 3 : 1,
        slidesToScroll: items.length > 3 ? 3 : 1,
        autoplay: true,
        focusOnSelect: true,
        autoplaySpeed: 3500
    }

    return (
        items.length > 0 && (
            <React.Fragment>
                <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Depoimentos de Clientes
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p">
                        {"Antes e depois de pessoas que seguiram o programa receitas"}
                    </Typography>
                </Container>
                {/* End hero unit */}
                <Container maxWidth="md" component="main" sx={{
                        pt: 8,
                        pb: 6,
                        px: {
                            xs: 4,
                            md: 0
                        }
                    }}>
                    <Slider {...sliderSettings}>
                        {items.map((item) => (
                            // Enterprise card is full width at sm breakpoint
                            <React.Fragment key={item.id}>
                                <CardTestimonial item={item} showImage={() => {
                                    setSelectedImage(item)
                                    setOpenImage(true)
                                }} />
                            </React.Fragment>
                        ))}
                    </Slider>
                </Container>
                <DialogFullScreenImage
                    fullScreen
                    open={openImage}
                    onClose={handleCloseImage}
                    TransitionComponent={Transition}

                    sx={{ background: 'rgba(0,0,0,0.2)' }}
                >
                    <Container sx={{ py: 1 }} maxWidth="xl">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleCloseImage}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>

                        </Toolbar>
                    </Container>
                    <Container sx={{ height: '100%' }}>
                        <Typography variant="body1" align={'center'}>
                            <ImageSrc src={selectedImage?.image} alt={selectedImage?.full_name} loading="lazy" />
                        </Typography>
                    </Container>
                </DialogFullScreenImage>
            </React.Fragment>
        )
    );
}

export default TestimonialsContent