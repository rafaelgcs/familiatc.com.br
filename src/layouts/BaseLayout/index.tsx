import { FC, ReactNode, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/services/auth';

interface BaseLayoutProps {
  children?: ReactNode;
  privated?: boolean;
  redirect?: string;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children, privated, redirect }) => {
  const navigate = useRouter();
  const [verifyingAuthenticated, setVerifyingAuthenticated] = useState(true)

  useEffect(() => {
    if (privated) {
      let authenticated = isAuthenticated()
      if (!authenticated) navigate.push(redirect ? redirect : '/')
      else setVerifyingAuthenticated(false)
    } else {
      setVerifyingAuthenticated(false)
    }
  }, [])
  return (
    verifyingAuthenticated ?
      <></> :
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          height: '100%'
        }}
      >
        {children}
      </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
  privated: PropTypes.bool,
  redirect: PropTypes.string
};

export default BaseLayout;
