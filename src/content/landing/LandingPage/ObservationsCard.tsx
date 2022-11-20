import {
    Card,
    Divider,
    List,
    ListItem,
    ListItemText,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const ListWrapper = styled(List)(
    () => `
          .MuiListItem-root {
            border-radius: 0;
            margin: 0;
          }
    `
);

const observations = [
    '* Não está incluso plano de alimentação nos pacotes. Para isso você deve procurar um nutricionista da sua confiança.',
    '* Você pode escolher se deseja um treino para fazer na ACADEMIA OU EM CASA.',
    '* Lembrando que, em uma academia, as condições e equipamentos para treinar são melhores. Mas se não gosta do ambiente, se você não tem mais saco de sair de casa para treinar, quem sabe os exercícios em casa sejam o que faltava!',
    '* O planejamento dos treinamentos tem validade de 30 dias.',
    '* Todo o processo de compra, preenchimento do questionário e recebimento do planejamento é feito pelo aplicativo.',
    '* As formas de pagamento são clicando no plano desejado.',
    '* Após a sua compra, toda a nossa comunicação se dará por meio da sua área de usuário; onde fico 100% disponível para ajudar nas dúvidas, questionamentos, entre outras situações.',
];

const ObservationsCard = () => {
    const theme = useTheme();

    return (
        <Card sx={{ height: '100%' }}>
            <ListWrapper disablePadding>
                {observations.map((t, index) => {
                    return (
                        <React.Fragment key={`${t}_technologies-List`}>
                            <ListItem
                                sx={{
                                    color: `${theme.colors.primary.main}`,
                                    '&:hover': { color: `${theme.colors.primary.dark}` }
                                }}
                                button
                            >
                                <ListItemText primary={t} />
                            </ListItem>
                            {
                                index != observations.length - 1 &&
                                <Divider />
                            }
                        </React.Fragment>
                    );
                })}
            </ListWrapper>
        </Card>
    );
}

export default ObservationsCard;
