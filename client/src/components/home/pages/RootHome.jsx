import { SectionHome } from './SectionHome';
import { SectionFeatures } from './SectionFeatures';
import { SectionAboutUs } from './SectionAboutUs';
import { SectionFooter } from './SectionFooter';


export const RootHome = () => {
    return (
        <>
            <SectionHome />
            <SectionFeatures />
            <SectionAboutUs />
            <SectionFooter/>
        </>
    )
}