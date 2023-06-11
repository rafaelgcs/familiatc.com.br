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
        width: auto;
        height: 40px;
`
);

const LogoTC = styled('img')(
  () => `
        width: auto;
        height: 40px;
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

function Logo() {
  // const { size } = props
  return (
      <TooltipWrapper
          title="Painel - Familia TC"
          arrow
      >
          <LogoWrapper href="/panel">
              <LogoSignWrapper>
                  <LogoTC src="/static/images/logo/tc_icon.png" />
              </LogoSignWrapper>
          </LogoWrapper>
      </TooltipWrapper>
  );
}

export default Logo;
