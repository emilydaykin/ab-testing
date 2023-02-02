import { trackEvent } from '@/analytics-api';

const ControlA = () => {
  const handleSignUp = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('signedUp')) {
        trackEvent({
          event: 'EXISTING user clicked sign up again',
          version: localStorage.version,
          visitorID: localStorage.visitorID,
        });
      } else {
        // if visitor hasn't already signed up, set new localStorage item
        localStorage.setItem('signedUp', 'true');
        trackEvent({
          event: 'NEW user sign up',
          version: localStorage.version,
          visitorID: localStorage.visitorID,
        });
      }
    }
  };

  return (
    <div className='controlA'>
      <div className='controlA__contents'>
        <h1 className='controlA__heading'>Check out the Blinkist app</h1>
        <div className='controlA__image'></div>
        <p className='controlA__text'>
          Meet the app that <span>revolutionised reading</span>.
        </p>
        <p className='controlA__text'>
          Meet the app that has <span>18 million users</span>.
        </p>
        <p className='controlA__text'>Thanks a lot for reading this article!&nbsp;</p>
        <p className='controlA__text controlA__text--cta'>
          <span className='controlA__button' onClick={handleSignUp}>
            SIGN UP
          </span>
          &nbsp;to Blinkist!
        </p>
      </div>
    </div>
  );
};

export default ControlA;
