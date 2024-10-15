import { Grid, ListItemText, MenuItem, Paper, TextField } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddQuestionForm = () => {
  const [value, setValue] = React.useState("");
  return (
    <React.Fragment>
      <Paper sx={{ p: 1 }}>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField variant="standard" label="Option 1" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField variant="standard" label="Option 2" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField variant="standard" label="Option 3" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField variant="standard" label="Option 4" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="Select Answer"
              fullWidth
              select
            >
              <MenuItem value="option 1">
                <ListItemText>Option 1</ListItemText>
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default AddQuestionForm;
