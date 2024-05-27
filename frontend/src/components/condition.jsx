import { RemoveScroll } from "react-remove-scroll";
import { SystemName } from "../assets/data/data";
import { useAppContext } from "../contexts/UseAppContext";
import logo from '../assets/images/logo_transparent_banner.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";





const Condition = () => {
    const { localTheme } = useAppContext();
    const navigate = useNavigate()

    return (
        <>
        <RemoveScroll className="blanket_opacte open-elementHeightPage scrollbar" style={{ zIndex: 25000, paddingTop: 0, display: 'flex', justifyContent: 'start', flexDirection: 'column', overflow: 'auto', paddingTop: 50 }} data-theme={localTheme}>
                <div className='nav_bar_scnd' style={{ margin: 0, padding: 0, height: 50, borderRadius: 0, alignItems: 'start', position: 'fixed', top: 0, zIndex: 10000 }} data-theme={localTheme}>
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: 5 }}>
                        <div onClick={() => navigate(-1)} className='button_option_container' style={{ maxWidth: 50, marginLeft: 10, display: 'flex', background: 'none' }} data-theme={localTheme}>
                            <div className='button_option' style={{ height: 40, width: 40, borderRadius: 100, marginRight: 5 }} data-theme={localTheme}><FontAwesomeIcon icon={faArrowLeft} /></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', maxWidth: 200, justifyContent: 'center' }}>
                            <img className='logo_event' style={{ height: 30 }} src={logo} alt="" onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
                        </div>
                    </div>
                </div>
            <div className='cter_sect'>
                <div className='ctent_arti' style={{ maxWidth: 1100, paddingBottom: 20, marginTop: 20 }} data-theme={localTheme}>

                    <ol>

                        <h1 style={{ color: '#403eb6' }}>Introduction and Acceptance of Terms</h1>
                        <p>Welcome to {SystemName}. These terms of use ("Terms") govern your use of our application. By accessing or using the application, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use the application.</p>

                        <li><h3>Description of the Service</h3></li>
                        <p>Our application provides various features that allow users to share, publish, and interact with content. Users can [briefly describe the main functionalities of your application].</p>

                        <li><h3>Intellectual Property Rights</h3></li>
                        <p>Users are responsible for the content they post on the application. Copyright and other intellectual property rights in the content remain with the creators. Users must respect copyright and trademark rights when posting content.</p>

                        <li><h3>Inappropriate Content</h3></li>
                        <p>We do not tolerate inappropriate or illegal content on our platform. Any such content will be removed.</p>

                        <li><h3>User Conduct Rules</h3></li>
                        <p>Users are expected to follow our code of conduct, which includes prohibitions on harassment, hate speech, adult content, and more. Violation of these rules may result in account suspension or termination.</p>

                        <li><h3>Right to Monitor</h3></li>
                        <p>We reserve the right to monitor user-generated content and take action in case of rule violations.</p>

                        <li><h3>Personal Data Protection</h3></li>
                        <p>We collect, use, and protect user personal data as described in our Privacy Policy. We comply with data protection laws, such as the GDPR in Europe.</p>

                        <li><h3>Changes to the Terms</h3></li>
                        <p>We may modify these Terms, and we will inform users of any changes. Continued use of the application after changes constitute acceptance of the updated Terms.</p>

                        <li><h3>Account Termination</h3></li>
                        <p>We outline the circumstances under which user accounts may be terminated, either by the user or by the company.</p>

                        <li><h3>Liability and Warranties</h3></li>
                        <p>We disclaim responsibility for user-generated content and provide the application "as is" without warranties.</p>

                        <li><h3>Contact and Support</h3></li>
                        <p>If you have questions or need assistance, please contact our support team at [support email].</p>

                        <li><h3>Applicable Law and Dispute Resolution</h3></li>
                        <p>These Terms are governed by [applicable law]. Any disputes will be resolved through [arbitration or the relevant courts].</p>

                        <li><h3>Language of the Terms</h3></li>
                        <p>These Terms are available in [languages], and in case of any conflict in translation, the [language] version prevails.</p>

                        <li><h3>Effective Date</h3></li>
                        <p>These Terms are effective as of [effective date].</p>

                        <li><h3>Disclaimer</h3></li>
                        <p>The information provided in these Terms is for informational purposes only and does not constitute legal advice.</p>

                        <h1 style={{ color: '#403eb6' }}>Inappropriate Content Policy:</h1>
                        <p><strong>1. Prohibition of Graphic Violence:</strong> Our platform strictly prohibits the sharing or display of graphic violence, including content that depicts violence in a realistic or excessively disturbing manner.</p>

                        <p><strong>2. Protecting Our Users:</strong> We are committed to providing a safe and respectful environment for all users. Content that promotes violence, harm, or endangers the well-being of others will not be tolerated.</p>

                        <p><strong>3. Reporting Inappropriate Content:</strong> Users are encouraged to report any content they find inappropriate or violent. We take these reports seriously and will investigate and take necessary actions accordingly.</p>

                        <p><strong>4. Age Restrictions:</strong> Certain content may have age restrictions. Users must adhere to these restrictions and ensure that they are of the appropriate age to view such content.</p>

                        <p><strong>5. Realistic Depictions of Violence:</strong> Realistic depictions of violence, especially if they can be easily mistaken for real-life violence, are strictly prohibited. This includes, but is not limited to, graphic images, videos, or simulations.</p>

                        <p><strong>6. Compliance with Applicable Laws:</strong> We comply with all applicable laws and regulations concerning the depiction of violence. Users are required to do the same within their respective jurisdictions.</p>

                        <p><strong>7. Removal and Consequences:</strong> Violation of this policy may result in the immediate removal of content and, in some cases, the suspension or termination of the offending user's account.</p>

                        <p><strong>8. Content Review:</strong> We review reported content promptly and take action based on the severity of the violation. Our goal is to maintain a safe and respectful online community.</p>

                        <p><strong>9. Appeal Process:</strong> Users who believe their content has been wrongly removed or their account unjustly penalized can appeal the decision through our <a href="contact.html">appeals process</a>.</p>

                        <p><strong>10. Support and Contact:</strong> If you have any questions or concerns regarding our inappropriate content policy or any other matter, please feel free to <a href="contact.html">contact our support team</a>.</p>




                        <h1 style={{ color: '#403eb6' }}>This part is about the user profile:</h1>

                        <h2 style={{ color: 'grey' }}>Profile Image Policies</h2>

                        <p><strong>1. Automatic Profile Image Cropping:</strong>When you upload a profile image to our platform, it will be automatically cropped to fit our size and format settings. This means that some parts of your original image may not be visible in the cropped version. This measure is taken to ensure that profile images comply with our size and format guidelines, contributing to the overall aesthetics of our platform.</p>

                        <p><strong>2. Profile Image Removal:</strong>You have complete control over your profile image. You can remove or replace it at any time by accessing your profile settings. This flexibility allows you to customize your profile image according to your preferences and update it as you evolve personally.</p>

                        <p><strong>3. +18 Content and Compliance with Terms of Use:</strong>We remind all our users that the content displayed in your profile image must adhere to our Terms of Use. Any adult (+18) or offensive content is strictly prohibited. We reserve the right to remove any profile image that violates our rules or is deemed inappropriate.</p>

                        <h2 style={{ color: 'grey' }}>Cover Image Policies</h2>

                        <p><strong>1. Automatic Cover Image Cropping:</strong>When you upload a cover image to our platform, it will be automatically cropped to fit our size and format settings. Unlike profile images, cover images are not cropped but only setting to the right height, which means you can adjust the framing of the image at any time. This measure is taken to ensure that cover images comply with our size and format guidelines, contributing to the overall aesthetics of our platform.</p>

                        <p><strong>2. Cover Image Removal and Customization:</strong>Similar to profile images, you have complete control over your cover image. You can remove or replace it at any time by accessing your profile settings. Additionally, you can adjust the framing of your cover image as needed, providing flexibility in personalizing your profile.</p>

                        <p><strong>3. +18 Content and Compliance with Terms of Use:</strong>As with profile images, we remind all our users that the content displayed in your cover image must adhere to our Terms of Use. Any adult (+18) or offensive content is strictly prohibited, and we reserve the right to remove any cover image that violates our rules or is deemed inappropriate.</p>
                        
                        <h1 style={{ color: '#403eb6' }}>Adult Content and Accessibility Policy:</h1>

                        <p><strong>1. Acceptance of Diverse Content:</strong> Our website welcomes a diverse audience, including users of different age groups. We strive to provide an inclusive online experience for all our users.</p>

                        <p><strong>2. Optional Adult Content:</strong> Our site may contain adult material (18+). However, access to this content is strictly optional and must be deliberately enabled by users.</p>

                        <p><strong>3. Hide Adult Content:</strong> We offer users the option to hide adult content. Users can activate this feature in their account settings to automatically exclude adult content from their browsing experience.</p>

                        <p><strong>4. Compliance with Local Laws:</strong> We comply with local laws and regulations regarding adult content. Users are required to adhere to the laws of their region concerning access to adult content.</p>

                        <p><strong>5. Prevention of Minor Access:</strong> We take reasonable steps to prevent minors from accessing adult content. However, we also encourage parents and guardians to monitor their children's internet usage.</p>

                        <p><strong>6. Report Inappropriate Content:</strong> Users are encouraged to report any inappropriate or offensive content they encounter on our site. We will promptly review these reports and take appropriate action.</p>

                        <p><strong>7. Respect Policy:</strong> We expect all users to respect the choices and preferences of others. Any harassment or abuse towards other users based on their content preferences will be severely dealt with.</p>

                        <p><strong>8. Content Preferences Modification:</strong> Users can modify their content preferences at any time in their account settings. This flexibility allows users to customize their experience based on their comfort.</p>

                        <p><strong>9. Privacy Policy:</strong> We take the privacy of our users seriously. User content preferences are treated confidentially and are not shared with third parties without consent.</p>

                        <p><strong>10. Support and Contact:</strong> If you have any questions or concerns regarding our adult content policy or any other matter, please feel free to <a href="contact.html">contact our support team</a>.</p>

                    </ol>

                </div>
            </div>
            </RemoveScroll>
        </>
    )
}

export default Condition