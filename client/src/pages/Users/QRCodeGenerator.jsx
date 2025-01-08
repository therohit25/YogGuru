import { QRCodeSVG } from "qrcode.react";
import PropTypes from "prop-types";
const QRCodeGenerator = ({ url }) => {
  return (
    <>
      <QRCodeSVG value={url} />
    </>
  );
};
QRCodeGenerator.propTypes = {
  url: PropTypes.string.isRequired,
};

export default QRCodeGenerator;
