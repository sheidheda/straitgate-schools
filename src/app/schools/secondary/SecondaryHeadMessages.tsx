'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const headMessages = [
  {
    quote: 'Every student is at the heart of our college community.',
    body: 'Straitgate College is a student-centred community where learners are known, supported, and challenged to grow in faith, character, academics, creativity, and leadership. With modern resources, digital learning, laboratories, and dedicated faculty, students are prepared to thrive spiritually, socially, and academically.',
    name: 'Head of School',
    school: 'Straitgate College',
  },
  {
    quote: 'Every student is at the heart of our high school community.',
    body: 'Straitgate High School provides a world-class, Christ-centred education that builds academic excellence, critical thinking, creativity, empathy, and responsibility. Through strong teaching, modern resources, personalized learning, and rich extracurricular opportunities, students are prepared for higher education, careers, and purposeful service.',
    name: 'Head of School',
    school: 'Straitgate High School',
  },
];

type HeadMessageProps = {
  message: (typeof headMessages)[number];
  className?: string;
};

function HeadMessage({ message, className = '' }: HeadMessageProps) {
  return (
    <div className={`sec-message-body ${className}`}>
      <span className="sec-quote-mark" aria-hidden="true">&ldquo;</span>
      <blockquote>{message.quote}</blockquote>
      <p>{message.body}</p>
      <cite>
        <strong>{message.name}</strong>
        <span>{message.school}</span>
      </cite>
    </div>
  );
}

export default function SecondaryHeadMessages() {
  const [activeMessage, setActiveMessage] = useState(0);
  const [exitingMessage, setExitingMessage] = useState<(typeof headMessages)[number] | null>(null);
  const [isMessageChanging, setIsMessageChanging] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);
  const currentMessage = headMessages[activeMessage];

  const changeMessage = useCallback((direction: -1 | 1) => {
    if (isMessageChanging) return;

    setExitingMessage(currentMessage);
    setIsMessageChanging(true);
    setActiveMessage((index) => (index + direction + headMessages.length) % headMessages.length);

    transitionTimerRef.current = window.setTimeout(() => {
      setExitingMessage(null);
      setIsMessageChanging(false);
      transitionTimerRef.current = null;
    }, 700);
  }, [currentMessage, isMessageChanging]);

  useEffect(() => {
    const timer = window.setInterval(() => changeMessage(1), 10000);
    return () => window.clearInterval(timer);
  }, [changeMessage]);

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
  }, []);

  return (
    <div className="sec-container sec-message-inner">
      <div className="sec-message-head">
        <p className="sec-kicker sec-kicker-light">From the Head&apos;s desk</p>
        <h2>Message from the Head of School</h2>
      </div>
      <div className="sec-message-stage">
        {exitingMessage ? <HeadMessage message={exitingMessage} className="is-exiting" /> : null}
        <HeadMessage key={currentMessage.school} message={currentMessage} className="is-entering" />
      </div>
      <div className="sec-message-controls">
        <button type="button" onClick={() => changeMessage(-1)} aria-label="Show previous head of school message">
          <ChevronLeftIcon aria-hidden="true" />
        </button>
        <span>
          {String(activeMessage + 1).padStart(2, '0')} / {String(headMessages.length).padStart(2, '0')}
        </span>
        <button type="button" onClick={() => changeMessage(1)} aria-label="Show next head of school message">
          <ChevronRightIcon aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
