import React, {useState} from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import "./AccordionProduct.scss";
import {Link} from "react-router-dom";
import {Spinner} from "../../../share/Spinner/Spinner";
export const AccordionProduct = ({id, productProps}) => {

    const arrBoolean = [];
    for (let i=0; i < 10; i++) {
        arrBoolean.push(true);
    }

    const [expanded, setExpanded] = useState(arrBoolean);

    const handleChange = (index) => {
        const newArr = expanded;
        expanded.forEach((value, i) => {
            if (index === i) {
                newArr[i] = !newArr[i];
            }
        })
        setExpanded([...expanded, newArr]);
    };

    return productProps.productTree ? (
        <Grid>
            {
                productProps.productTree.map((val, i) => {
                    return (
                        <Accordion key={i}  expanded={expanded[i]} onChange={() => handleChange(i)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography variant="h6">{val.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    val.categories &&
                                    val.categories.length > 0 &&
                                    val.categories.map((v, index) => {
                                        return (
                                            <Link key={index} to={`/product/category/${v._id}`}
                                                  exact="true"
                                                  className={id === v._id ? 'active pl-14 py-3' : 'pl-14 py-3'}>
                                                <Typography variant="subtitle1" className="font-weight-bold"
                                                            key={index}>
                                                    {v.name}
                                                </Typography>
                                            </Link>

                                        )
                                    })
                                }
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </Grid>

    ) : <Spinner />
}
