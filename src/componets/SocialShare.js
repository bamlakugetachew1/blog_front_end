import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import BlogContext from "../store/blogstore";
import { useContext } from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  RedditShareButton,
  EmailShareButton,
  ViberShareButton,
  LineShareButton,
  TumblrShareButton,
  TumblrIcon,
  LineIcon,
  ViberIcon,
  EmailIcon,
  RedditIcon,
  PinterestIcon,
  WhatsappIcon,
  LinkedinIcon,
  TelegramIcon,
  FacebookIcon,
} from "react-share";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { openpopup, changopenpopuptoFalse } = useContext(BlogContext);
  const handleClose = () => {
    changopenpopuptoFalse();
  };
  const myPromise = new Promise((resolve, reject) => {
    let cms = "Opendialog";
    if (cms === "Opendialog") {
      resolve("Success: The promise has successfully resolved!");
    } else {
      reject("Failure: The promise has failed!");
    }
  });
  return (
    <div>
      <Dialog
        open={openpopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <p className="text-center capitalize font-body">
            choose social media to share
          </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="flex gap-2 flex-wrap justify-center max-w-md">
              <FacebookShareButton
                url={props.url}
                quote={props.title}
                hashtag={`#${props.title}`}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TelegramShareButton
                beforeOnClick={() => {
                  myPromise.then(
                    (result) => {
                      console.log(result); // Prints "Success: The promise has successfully resolved!"
                    },
                    (error) => {
                      console.log(error); // Never executes because the Promise is resolved
                    }
                  );
                }}
                url={props.url}
                title={props.title}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <LinkedinShareButton url={props.url} title={props.title}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <WhatsappShareButton url={props.url} title={props.title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <PinterestShareButton url={props.url} description={props.title}>
                <PinterestIcon size={32} round />
              </PinterestShareButton>
              <RedditShareButton url={props.url} title={props.title}>
                <RedditIcon size={32} round />
              </RedditShareButton>
              <EmailShareButton url={props.url} subject={props.title}>
                <EmailIcon size={32} round />
              </EmailShareButton>
              <ViberShareButton url={props.url} title={props.title}>
                <ViberIcon size={32} round />
              </ViberShareButton>
              <LineShareButton url={props.url} title={props.title}>
                <LineIcon size={32} round />
              </LineShareButton>
              <TumblrShareButton
                url={props.url}
                title={props.title}
                caption={props.title}
              >
                <TumblrIcon size={32} round />
              </TumblrShareButton>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <p className="font-body rounded-md bg-slate-200 p-2 ">Close</p>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
