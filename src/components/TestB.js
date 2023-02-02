import { trackEvent } from '@/analytics-api';

const TestB = () => {
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
    <div className='testB'>
      <div className='testB__contents'>
        <h1 className='testB__heading'>Check out the Blinkist app</h1>
        <div className='testB__video-wrapper'>
          <p className='testB__video-quote'>
            &ldquo;More knowledge <br />
            in less time&rdquo;
          </p>
          <video className='testB__video' autoPlay muted loop>
            <source src='testBvideo.mp4' type='video/mp4' />
            Your browser is not supported to play this video.
          </video>
        </div>
        <p className='testB__text'>
          Meet the app that <span>revolutionised reading</span>.
        </p>
        <p className='testB__text'>
          Meet the app that has <span>18 million users</span>.
        </p>
        <p className='testB__text'>Thanks a lot for reading this article!&nbsp;</p>
        <p className='testB__text testB__text--cta'>
          <button className='testB__button' onClick={handleSignUp}>
            SIGN UP
          </button>
        </p>
        <p className='testB__quote'>
          &ldquo;Perfect for curious people who love to learn, busy people who don&apos;t have time
          to read, and even people who aren&apos;t into reading.&rdquo;
        </p>
      </div>
    </div>
  );
};

export default TestB;
