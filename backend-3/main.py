from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

import models
import schemas
from database import engine, SessionLocal, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Salon API")

def seed_db():
    db = SessionLocal()
    if db.query(models.Master).count() == 0:
        masters = [
            models.Master(name="Анна", specialization="Парикмахер"),
            models.Master(name="Мария", specialization="Визажист"),
            models.Master(name="Елена", specialization="Парикмахер"),
            models.Master(name="Ольга", specialization="Мастер маникюра")
        ]
        db.add_all(masters)
        db.commit()
    db.close()

seed_db()

@app.get("/masters", response_model=List[schemas.MasterResponse])
def get_masters(specialization: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Master)

    if specialization:
        query = query.filter(models.Master.specialization == specialization)

    return query.all()

@app.get("/masters/{master_id}", response_model=schemas.MasterResponse)
def get_master(master_id: int, db: Session = Depends(get_db)):
    master = db.query(models.Master).filter(models.Master.id == master_id).first()

    if master is None:
        raise HTTPException(status_code=404, detail="Master not found")

    return master