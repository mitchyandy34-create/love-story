import { useState, useEffect } from 'react';
import { CONFIG } from '../data/config';

const letterText = `My Dearest ${CONFIG.herName},

Happy Birthday, my love. Today, I want to tell you things I don't say often enough.

First, thank you. Thank you for being you. Thank you for choosing me, for loving me, for standing by me even when I don't deserve it. You have a heart that makes the world softer, and I am endlessly grateful that I get to know it.

I think about the first time I saw you, and I smile. I think about the first time I made you laugh, and I smile wider. I think about every moment since, and I realize that my life has been infinitely better because you are in it.

You changed me. Not in the way people change each other — you didn't try to fix me or mold me. You just loved me, and that love made me want to be the person you already believed I was. That is the most powerful thing anyone has ever done for me.

I love your smile. I love your mind. I love the way you see beauty in things others overlook. I love how you make me feel like I matter, like my dreams matter, like our future matters.

On this birthday, I wish for you every joy you can imagine and some you haven't dreamed of yet. I wish for you peace on the hard days and laughter on the good ones. I wish for you to always know, without a shadow of a doubt, that you are deeply, completely, unconditionally loved.

I promise to keep choosing you. Every day. In every way. Through every season. I promise to keep building this beautiful thing we have, one memory at a time, one laugh at a time, one "I love you" at a time.

Happy Birthday, My Love.

If I had to choose you again, I'd still choose you.

Forever yours,`;

export default function BirthdayLetter() {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < letterText.length) {
        setDisplayedText(letterText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="section-padding"
      style={{
        background: 'linear-gradient(135deg, rgba(107,15,26,0.1), rgba(10,10,10,0.95))',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <p className="text-script" style={{ marginBottom: '10px' }}>From My Heart To Yours</p>
          <h2 className="heading-lg">My Birthday Letter To You ❤️</h2>
        </div>

        <div
          className="glass"
          style={{
            padding: '50px',
            borderRadius: '20px',
            border: '1px solid rgba(212,175,55,0.2)',
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            lineHeight: 2,
            color: 'rgba(250,250,250,0.9)',
            minHeight: '400px',
          }}
        >
          {displayedText}
          {!isComplete && <span style={{ borderRight: '2px solid var(--gold)', animation: 'blink 0.7s step-end infinite' }}>&nbsp;</span>}
        </div>

        {isComplete && (
          <div style={{ textAlign: 'center', marginTop: '40px', animation: 'fadeInUp 1s ease' }}>
            <p className="text-script" style={{ fontSize: '1.8rem', color: 'var(--gold)' }}>
              Happy Birthday, My Love.
            </p>
            <p className="text-script" style={{ fontSize: '1.5rem', marginTop: '10px' }}>
              If I had to choose you again, I'd still choose you.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}