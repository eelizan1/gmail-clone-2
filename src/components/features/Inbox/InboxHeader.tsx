import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import CreateIcon from "@material-ui/icons/Create";
import "./InboxHeader.scss";
import { MenuItem, Menu } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { deleteFromList } from "../../../app/redux";
import { deleteArray } from "../../helpers/MessageHelper";

interface IInboxHeaderProps {
  isAllChecked: boolean;
  setIsAllChecked: (value: boolean) => void;
}

const InboxHeader: React.FC<IInboxHeaderProps> = ({
  isAllChecked,
  setIsAllChecked,
}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const options = ["Inbox", "Work", "Travel"];

  // handle infividual selection of check boxes
  const handleChange = () => {
    if (isAllChecked) {
      setIsAllChecked(false);
    } else {
      setIsAllChecked(true);
    }
  };

  const handleRefresh = () => {
    window.location.reload(false);
  };

  const handleVerticalIcon = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // set inbox filter to selected label type
  const handleClose = (value: any) => {
    dispatch({
      type: value.toString().toLowerCase(),
    });
    setAnchorEl(null);
  };

  // delect selected emails
  const handledelete = () => {
    dispatch(deleteFromList(deleteArray));
  };

  return (
    <div className="inbox-header-wrapper">
      <Checkbox
        checked={isAllChecked}
        onChange={handleChange}
        className="header-checkbox"
        color="primary"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <IconButton aria-label="refresh" onClick={handleRefresh}>
        <RefreshIcon className="refresh-icon" color="action" />
      </IconButton>
      <IconButton aria-label="delete" onClick={handledelete}>
        <DeleteIcon className="delete-icon" color="action" />
      </IconButton>
      <IconButton className="create-icon" aria-label="create">
        <CreateIcon color="action" />
      </IconButton>

      <IconButton
        className="vertical-icon"
        aria-label="vertical"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleVerticalIcon}
      >
        <MoreVertOutlinedIcon color="action" />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => handleClose(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default InboxHeader;
