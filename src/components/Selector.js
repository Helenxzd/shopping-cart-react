import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect() {
    const classes = useStyles();
    const [rank, setRank] = React.useState('');

    const handleChange = (event) => {
        setRank(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Order by</InputLabel>
                <Select
                    value={rank}
                    onChange={handleChange}
                >
                    <MenuItem value={'Select'}>Select</MenuItem>
                    <MenuItem value={'Lowest to highest'}>Lowest to highest</MenuItem>
                    <MenuItem value={'Highest to lowest'}>Highest to lowest</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}