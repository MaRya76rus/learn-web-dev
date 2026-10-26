export default function StepsBar() {
  return (
    <div className="steps-container">
      <div className="step">
        <div className="circle last"><span>1</span></div>
        <span className="step-text">ВЫБРАТЬ МАСТЕРА</span>
        <div className="step-line" />
      </div>
      <div className="step">
        <div className="circle last"><span>2</span></div>
        <span className="step-text">ВЫБРАТЬ УСЛУГУ</span>
        <div className="step-line" />
      </div>
      <div className="step">
        <div className="circle"><span>3</span></div>
        <span className="step-text">ВЫБРАТЬ ДАТУ</span>
        <div className="step-line" />
      </div>
      <div className="step">
        <div className="circle empty"><span>4</span></div>
        <span className="step-text-light">ВВЕСТИ КОНТАКТЫ</span>
        <div className="step-line" />
      </div>
      <div className="step">
        <div className="circle empty"><span>5</span></div>
        <span className="step-text-light">ПОДТВЕРДИТЬ ЗАПИСЬ</span>
      </div>
    </div>
  );
}