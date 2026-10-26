export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="logo">LUME</div>
          <p className="footer-desc">
            Барбершоп с вниманием к деталям<br />
            Стрижки, уход и уверенный стиль
          </p>
        </div>
        <div className="footer-col">
          <h3 className="footer-title">КОНТАКТЫ</h3>
          <p className="footer-text">📍 ул. Большая Дмитровка, 12</p>
          <p className="footer-text">📞 +7 999 123-45-67</p>
        </div>
        <div className="footer-col">
          <h3 className="footer-title">РЕЖИМ РАБОТЫ</h3>
          <p className="footer-text">Пн-Пт 10:00-22:00</p>
          <p className="footer-text">Сб-Вс 10:00-21:00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">© 2026 LUME. ВСЕ ПРАВА ЗАЩИЩЕНЫ</p>
        <a href="#" className="privacy-link">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
      </div>
    </footer>
  );
}