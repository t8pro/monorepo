'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const pathname = usePathname();
  
  const defaultItems: BreadcrumbItem[] = [
    { label: 'Início', href: '/' },
  ];

  // Se não houver items customizados, usa os padrão baseados no pathname
  const breadcrumbItems = items || defaultItems;

  // Adiciona o item atual se não estiver na lista
  if (pathname !== '/' && !breadcrumbItems.some(item => item.href === pathname)) {
    const currentPage = pathname.split('/').pop() || '';
    const currentLabel = currentPage
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbItems.push({
      label: currentLabel || 'Página Atual',
      href: pathname,
    });
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://francieliazevedo.com/ugc'}${item.href}`,
    })),
  };

  return (
    <>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol className={styles.list}>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <li key={item.href} className={styles.item}>
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                )}
                {!isLast && <span className={styles.separator} aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
};

