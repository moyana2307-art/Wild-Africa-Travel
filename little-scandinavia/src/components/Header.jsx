import { useEffect, useRef, useState } from 'react';
import { megaMenus, navigation } from '../data/content';

function initialDrill() {
  return [
    {
      title: 'Menu',
      items: navigation.map((item) =>
        item.menu ? { ...item, nextType: 'menu', menuKey: item.menu } : item
      )
    }
  ];
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function ChevronIcon({ direction = 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={`chevron chevron--${direction}`}
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 5 19 19M19 5 5 19" />
    </svg>
  );
}

export default function Header() {
  const [language, setLanguage] = useState('EN');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drill, setDrill] = useState(initialDrill);
  const [desktopMenu, setDesktopMenu] = useState(null);
  const [desktopCategory, setDesktopCategory] = useState(0);
  const [desktopGroup, setDesktopGroup] = useState(0);
  const closeButtonRef = useRef(null);

  const menu = desktopMenu ? megaMenus[desktopMenu] : null;
  const activeCategory = menu?.categories[desktopCategory];
  const activeGroup = activeCategory?.groups[desktopGroup];

  useEffect(() => {
    document.documentElement.lang = language === 'FR' ? 'fr' : 'en';
  }, [language]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) closeButtonRef.current?.focus();
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setMobileOpen(false);
      setDesktopMenu(null);
      setSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const openDesktopMenu = (key) => {
    setDesktopMenu(key);
    setDesktopCategory(0);
    setDesktopGroup(0);
  };

  const closeAll = () => {
    setMobileOpen(false);
    setDesktopMenu(null);
    setSearchOpen(false);
  };

  const openMobile = () => {
    setDrill(initialDrill());
    setMobileOpen(true);
  };

  const goBack = () => {
    if (drill.length > 1) {
      setDrill((levels) => levels.slice(0, -1));
      return;
    }
    setMobileOpen(false);
  };

  const advance = (item) => {
    if (item.nextType === 'menu') {
      const nextMenu = megaMenus[item.menuKey];
      setDrill((levels) => [
        ...levels,
        {
          title: nextMenu.title,
          items: nextMenu.categories.map((category) => ({
            ...category,
            nextType: 'category',
            menuKey: item.menuKey
          }))
        }
      ]);
      return;
    }

    if (item.nextType === 'category') {
      const nextMenu = megaMenus[item.menuKey];
      const category = nextMenu.categories.find((entry) => entry.id === item.id);
      setDrill((levels) => [
        ...levels,
        {
          title: `${category.verb} · ${category.label}`,
          items: category.groups.map((group) => ({
            ...group,
            nextType: 'group',
            menuKey: item.menuKey,
            categoryId: category.id
          }))
        }
      ]);
      return;
    }

    if (item.nextType === 'group') {
      const nextMenu = megaMenus[item.menuKey];
      const category = nextMenu.categories.find((entry) => entry.id === item.categoryId);
      const group = category.groups.find((entry) => entry.id === item.id);
      setDrill((levels) => [
        ...levels,
        {
          title: group.label,
          items: group.links.map((link) => ({ ...link, leaf: true }))
        }
      ]);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchOpen(false);
    document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="site-header" id="top" onMouseLeave={() => setDesktopMenu(null)}>
      <div className="top-bar">
        <div className="shell top-bar__inner">
          <div className="language-toggle" role="group" aria-label="Choose a language">
            <button
              type="button"
              className={language === 'FR' ? 'is-active' : ''}
              aria-pressed={language === 'FR'}
              onClick={() => setLanguage('FR')}
            >
              FR
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              className={language === 'EN' ? 'is-active' : ''}
              aria-pressed={language === 'EN'}
              onClick={() => setLanguage('EN')}
            >
              EN
            </button>
          </div>

          <a className="brand" href="#top" aria-label="Little Scandinavia, back to top">
            <span className="brand__mark" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <path d="M4 28c6-10 12-15 16-15s10 5 16 15" />
                <path d="M12 18c2-7 5-11 8-11s6 4 8 11" />
              </svg>
            </span>
            <span className="brand__text">
              <strong>Little Scandinavia</strong>
              <small>Lakes · Forests · Big skies</small>
            </span>
          </a>

          <div className="top-bar__actions">
            <button
              type="button"
              className="icon-button"
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
            <button
              type="button"
              className="menu-button"
              aria-label="Open main menu"
              aria-expanded={mobileOpen}
              onClick={openMobile}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {searchOpen && (
          <form className="header-search" onSubmit={handleSearch} role="search">
            <label className="sr-only" htmlFor="site-search">
              Search this site
            </label>
            <input
              id="site-search"
              type="search"
              placeholder="Search lakes, walks, villages…"
              autoFocus
            />
            <button type="submit" className="button button--red">
              Search
            </button>
          </form>
        )}
      </div>

      <nav className="primary-nav" aria-label="Primary navigation">
        <div className="shell primary-nav__inner">
          <ul>
            {navigation.map((item) => {
              const hasMenu = Boolean(item.menu);
              const expanded = desktopMenu === item.menu;
              return (
                <li
                  key={item.id}
                  onMouseEnter={() => (hasMenu ? openDesktopMenu(item.menu) : setDesktopMenu(null))}
                  onFocus={() => (hasMenu ? openDesktopMenu(item.menu) : setDesktopMenu(null))}
                >
                  {hasMenu ? (
                    <button
                      type="button"
                      className="nav-link"
                      aria-haspopup="true"
                      aria-expanded={expanded}
                      onClick={() => (expanded ? setDesktopMenu(null) : openDesktopMenu(item.menu))}
                    >
                      {item.label}
                      <ChevronIcon direction="down" />
                    </button>
                  ) : (
                    <a className="nav-link" href={item.href} onClick={closeAll}>
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {menu && (
          <div className="mega-menu" role="region" aria-label={`${menu.title} menu`}>
            <div className="shell mega-menu__inner">
              <div className="mega-menu__intro">
                <p className="eyebrow">Explore</p>
                <h2>{menu.title}</h2>
                <p>{menu.intro}</p>
              </div>

              <div className="mega-menu__column" aria-label="Level one">
                <p className="mega-menu__label">Choose a theme</p>
                {menu.categories.map((category, index) => (
                  <button
                    type="button"
                    key={category.id}
                    className={index === desktopCategory ? 'is-active' : ''}
                    aria-current={index === desktopCategory ? 'true' : undefined}
                    onClick={() => {
                      setDesktopCategory(index);
                      setDesktopGroup(0);
                    }}
                  >
                    <span>{category.verb}</span>
                    {category.label}
                    <ChevronIcon />
                  </button>
                ))}
              </div>

              <div className="mega-menu__column" aria-label="Level two">
                <p className="mega-menu__label">Choose a path</p>
                {activeCategory?.groups.map((group, index) => (
                  <button
                    type="button"
                    key={group.id}
                    className={index === desktopGroup ? 'is-active' : ''}
                    aria-current={index === desktopGroup ? 'true' : undefined}
                    onClick={() => setDesktopGroup(index)}
                  >
                    {group.label}
                    <ChevronIcon />
                  </button>
                ))}
              </div>

              <div className="mega-menu__column" aria-label="Level three">
                <p className="mega-menu__label">Go to</p>
                {activeGroup?.links.map((link) => (
                  <a key={link.label} href={link.href} onClick={closeAll}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {mobileOpen && (
        <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Main menu">
          <div className="mobile-nav__top shell">
            <button type="button" className="mobile-nav__back" onClick={goBack}>
              <ChevronIcon direction="left" />
              Back
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label="Close main menu"
              ref={closeButtonRef}
              onClick={() => setMobileOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mobile-nav__stack">
            {drill.map((level, levelIndex) => (
              <section
                key={level.title}
                className={`mobile-nav__level ${levelIndex === drill.length - 1 ? 'is-active' : ''}`}
                aria-hidden={levelIndex !== drill.length - 1}
                inert={levelIndex !== drill.length - 1}
              >
                <div className="shell">
                  <p className="eyebrow">{levelIndex === 0 ? 'Explore' : 'Menu'}</p>
                  <h2>{level.title}</h2>
                  <ul>
                    {level.items.map((item) => (
                      <li key={item.id || item.label}>
                        {item.nextType ? (
                          <button type="button" onClick={() => advance(item)}>
                            <span>{item.verb ? `${item.verb} · ${item.label}` : item.label}</span>
                            <ChevronIcon />
                          </button>
                        ) : (
                          <a href={item.href} onClick={() => setMobileOpen(false)}>
                            {item.label}
                            <ChevronIcon />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
