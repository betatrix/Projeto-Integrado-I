import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import * as React from 'react';
import {
    faqBoxStyles,
    innerBoxStyles,
    listStyles,
    listItemIconStyles,
    listItemTextStyles,
    FaqTitle,
} from './styles';
import { useTranslation } from 'react-i18next';

export const Faq: React.FC = () => {
    const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>({});
    const{ t } = useTranslation();

    const handleClick = (item: string) => {
        setOpenItems(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }));
    };
    return (
        <Box sx={faqBoxStyles}>
            <Box sx={innerBoxStyles}>
                <Typography sx={FaqTitle} component="span">
                    {t('faqTitle')}
                </Typography>
                <Box sx={listStyles}>
                    <ListItemButton onClick={() => handleClick('item1')}>
                        <ListItemIcon>
                            <QuestionAnswerIcon sx={listItemIconStyles}/>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary={t('faqTitleText1')} />
                        {openItems['item1'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItems['item1']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary={t('faqText1')} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
                <Box sx={listStyles}>
                    <ListItemButton onClick={() => handleClick('item2')}>
                        <ListItemIcon>
                            <QuestionAnswerIcon sx={listItemIconStyles}/>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary={t('faqTitleText2')} />
                        {openItems['item2'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItems['item2']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary={t('faqText2')} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
                <Box sx={listStyles}>
                    <ListItemButton onClick={() => handleClick('item3')}>
                        <ListItemIcon >
                            <QuestionAnswerIcon sx={listItemIconStyles} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary={t('faqTitleText3')} />
                        {openItems['item3'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItems['item3']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary={t('faqText3')} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
                <Box sx={listStyles}>
                    <ListItemButton onClick={() => handleClick('item4')}>
                        <ListItemIcon>
                            <QuestionAnswerIcon sx={listItemIconStyles} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary={t('faqTitleText4')} />
                        {openItems['item4'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItems['item4']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary={t('faqText4')} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
                <Box sx={listStyles}>
                    <ListItemButton onClick={() => handleClick('item5')}>
                        <ListItemIcon>
                            <QuestionAnswerIcon sx={listItemIconStyles}/>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }}
                            primary={t('faqTitleText5')} />
                        {openItems['item5'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItems['item5']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary={t('faqText5')} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
            </Box>
        </Box >
    );
};

export default Faq;
