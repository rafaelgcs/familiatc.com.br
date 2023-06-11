import {
    Box,
    Tooltip,
    TooltipProps,
    tooltipClasses,
    styled
} from '@mui/material';
import Link from 'src/components/Link';

const LogoWrapper = styled(Link)(
    ({ theme }) => `
          color: ${theme.palette.text.primary};
          display: flex;
          text-decoration: none;
          width: 80px;
          margin: 0 auto;
          text-align: center;
          font-weight: ${theme.typography.fontWeightBold};
  `
);

const LogoSignWrapper = styled(Box)(
    () => `
          width: 80px;
          height: auto;
  `
);

const LogoTC = styled('img')(
    () => `
          width: 80px;
          height: auto;
  `
)

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.colors.alpha.trueWhite[100],
        color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
        fontSize: theme.typography.pxToRem(12),
        fontWeight: 'bold',
        borderRadius: theme.general.borderRadiusSm,
        boxShadow:
            '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.colors.alpha.trueWhite[100]
    }
}));

function LogoWithSize(props) {
    const { size } = props
    return (
        <TooltipWrapper
            title="Painel Administrativo - Familia TC Landing Page"
            arrow
        >
            <LogoWrapper href="/" sx={{ width: size }}>
                <LogoSignWrapper sx={{ width: size }}>
                    <LogoTC sx={{ width: size }} src="/static/images/logo/tiago_carvalho.png" />
                </LogoSignWrapper>
            </LogoWrapper>
        </TooltipWrapper>
    );
}

export default LogoWithSize;
