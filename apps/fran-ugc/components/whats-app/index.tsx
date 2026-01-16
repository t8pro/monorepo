import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './styles.module.scss';

export const WhatsAppButton = () => (
  <Link
    href="https://wa.me/+5567998777776"
    target="_blank"
    className={styles.button}
    aria-label="Chat on WhatsApp"
  >
    <FaWhatsapp />
  </Link>
);
