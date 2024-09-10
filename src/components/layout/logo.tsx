import images from '@/assets/images';
import { CSSProperties } from 'react';

type PropsLogo = {
    style?: CSSProperties;
};

const Logo: React.FC<PropsLogo> = ({ style }) => {
    const styleLogo: CSSProperties = {
        width: '25px',
        height: '25px',
    };
    return (
        <img
            style={style ? style : styleLogo}
            src={images.logo200x200}
            alt="Techmaster - học là có việc"
        />
    );
};

export default Logo;
