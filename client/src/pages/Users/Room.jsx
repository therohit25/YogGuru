// npm i @zegocloud/zego-uikit-prebuilt --save
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
const Room = () => {
  const userdetails = useSelector((state) => state.userSlice.value);
  let { roomID } = useParams();
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = import.meta.env.APP_ID;
    const serverSecret = import.meta.env.ZEGO_SERVER_SECRET_KEY;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userdetails?._id,
      userdetails?.Name
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };
  return (
    <>
      <div ref={myMeeting}></div>
    </>
  );
};

export default Room;
