import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

engine = create_engine('sqlite:///data/aus_trade.sqlite')
Base = automap_base()
Base.prepare(engine, reflect=True)

app = Flask(__name__)

@app.route('/')
def index():
    tb_YearTradeExport = Base.classes.YearTradeExport
    tb_YearTradeImport = Base.classes.YearTradeImport

    session = Session(engine)

    TradeExIm_dict = []
    YearTradeExport = session.query(tb_YearTradeExport).all()
    for yte in YearTradeExport:
        sum_Export = 0
        sum_Import = 0
        YearTradeImport = session.query(tb_YearTradeImport).filter(tb_YearTradeImport.Year == yte.__dict__['Year']).all()
        trade_dict = {'Year' : yte.__dict__['Year']}
        trade_arr = []
        for key in tb_YearTradeExport.__table__.columns.keys()[1:]:
            trade_temp = {'Country' : key}
            trade_temp['Export'] = yte.__dict__[key]
            trade_temp['Import'] = YearTradeImport[0].__dict__[key]
            trade_arr.append(trade_temp)
            try:
                sum_Export += float(yte.__dict__[key])
                sum_Import += float(YearTradeImport[0].__dict__[key])
            except:
                pass
        trade_dict['Trade'] = trade_arr
        trade_dict['Export'] = sum_Export
        trade_dict['Import'] = sum_Import
        trade_dict['Total'] = sum_Export + sum_Import
        trade_dict['Balance'] = sum_Export - sum_Import

        TradeExIm_dict.append(trade_dict)

    with open('data/aus_trade.json', 'w') as jsonFile:
        json.dump(TradeExIm_dict, jsonFile)

    return jsonify(TradeExIm_dict)


if __name__ == "__main__":
    app.run(debug=True)