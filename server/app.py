#!/usr/bin/env python3

from flask import Flask, jsonify
from flask_cors import CORS
from models import db, Movie

def create_app():
    app = Flask(__name__)
    
    # Configure the database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    # Routes
    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy'})
    
    @app.route('/api/movies')
    def get_movies():
        movies = Movie.query.all()
        return jsonify([movie.to_dict() for movie in movies])
    
    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
