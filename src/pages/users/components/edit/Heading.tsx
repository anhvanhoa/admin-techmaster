type PropsHeading = {
    fullName?: string;
};
const Heading: React.FC<PropsHeading> = ({ fullName }) => {
    return (
        <p style={{ paddingLeft: '20px', margin: '0' }}>Thông tin {fullName}</p>
    );
};

export default Heading;
