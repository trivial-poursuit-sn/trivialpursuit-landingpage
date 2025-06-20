'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Star,
  ArrowRight,
  RotateCcw,
  Home,
  Target,
  Zap,
  Award
} from 'lucide-react'

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    category: "Programmation",
    question: "Quelle est la complexité temporelle de la recherche dans un arbre binaire équilibré ?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Dans un arbre binaire équilibré, la hauteur est log(n), donc la recherche prend O(log n) opérations."
  },
  {
    id: 2,
    category: "Réseaux",
    question: "Quel protocole est utilisé pour traduire les noms de domaine en adresses IP ?",
    options: ["HTTP", "DNS", "FTP", "SMTP"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "DNS (Domain Name System) traduit les noms de domaine lisibles en adresses IP numériques."
  },
  {
    id: 3,
    category: "Cybersécurité",
    question: "Qu'est-ce qu'une attaque par déni de service distribué (DDoS) ?",
    options: [
      "Une attaque qui vole des données personnelles",
      "Une attaque qui surcharge un serveur avec du trafic",
      "Une attaque qui modifie des fichiers système",
      "Une attaque qui intercepte les communications"
    ],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Une attaque DDoS utilise plusieurs sources pour submerger un serveur de requêtes, le rendant indisponible."
  },
  {
    id: 4,
    category: "Base de Données",
    question: "Que signifie ACID dans le contexte des bases de données ?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Access, Control, Integration, Data",
      "Automatic, Concurrent, Indexed, Distributed",
      "Advanced, Centralized, Intelligent, Dynamic"
    ],
    correctAnswer: 0,
    difficulty: "Avancé",
    explanation: "ACID garantit la fiabilité des transactions : Atomicité, Cohérence, Isolation et Durabilité."
  },
  {
    id: 5,
    category: "Intelligence Artificielle",
    question: "Qu'est-ce que le machine learning supervisé ?",
    options: [
      "Un apprentissage sans données d'entraînement",
      "Un apprentissage avec des données étiquetées",
      "Un apprentissage qui ne nécessite pas d'algorithme",
      "Un apprentissage uniquement pour les images"
    ],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "L'apprentissage supervisé utilise des données étiquetées pour entraîner le modèle à faire des prédictions."
  }
]

type QuizState = 'start' | 'playing' | 'finished'

export default function QuizSolo() {
  const router = useRouter()
  const [quizState, setQuizState] = useState<QuizState>('start')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)

  // Timer effect
  useEffect(() => {
    if (quizState === 'playing' && timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp()
    }
  }, [timeLeft, quizState, isAnswered])

  const startQuiz = () => {
    setQuizState('playing')
    setCurrentQuestion(0)
    setUserAnswers([])
    setScore(0)
    setTimeLeft(30)
    setIsAnswered(false)
    setShowExplanation(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return
    
    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answerIndex
    setUserAnswers(newAnswers)
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    
    setShowExplanation(true)
  }

  const handleTimeUp = () => {
    if (isAnswered) return
    
    setIsAnswered(true)
    setSelectedAnswer(-1) // -1 pour indiquer timeout
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = -1
    setUserAnswers(newAnswers)
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setShowExplanation(false)
      setTimeLeft(30)
    } else {
      setQuizState('finished')
    }
  }

  const resetQuiz = () => {
    setQuizState('start')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setUserAnswers([])
    setShowExplanation(false)
    setTimeLeft(30)
    setScore(0)
    setIsAnswered(false)
  }

  const getScoreLevel = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return { level: "Expert", color: "text-green-400", icon: <Trophy className="h-6 w-6" /> }
    if (percentage >= 60) return { level: "Avancé", color: "text-blue-400", icon: <Star className="h-6 w-6" /> }
    if (percentage >= 40) return { level: "Intermédiaire", color: "text-yellow-400", icon: <Target className="h-6 w-6" /> }
    return { level: "Débutant", color: "text-red-400", icon: <Zap className="h-6 w-6" /> }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermédiaire': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Avancé': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Page de démarrage
  if (quizState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              className="text-white hover:text-purple-300 mb-4"
              onClick={() => router.push('/')}
            >
              <Home className="h-4 w-4 mr-2" />
              Retour à l&apos;accueil
            </Button>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white mb-4">
                Test de Niveau - Informatique
              </CardTitle>
              <CardDescription className="text-lg text-slate-300 max-w-2xl mx-auto">
                Évaluez vos connaissances techniques avec notre quiz complet. 
                5 questions couvrant différents domaines de l&apos;informatique.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Informations du quiz */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Durée</h3>
                  <p className="text-slate-300">30 sec/question</p>
                </div>
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Questions</h3>
                  <p className="text-slate-300">5 questions</p>
                </div>
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Award className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Évaluation</h3>
                  <p className="text-slate-300">Niveau personnalisé</p>
                </div>
              </div>

              {/* Catégories couvertes */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Domaines couverts
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Programmation', 'Réseaux', 'Cybersécurité', 'Base de Données', 'Intelligence Artificielle'].map((category) => (
                    <Badge key={category} variant="outline" className="border-purple-500/30 text-purple-300">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bouton de démarrage */}
              <div className="text-center pt-6">
                <Button 
                  onClick={startQuiz}
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-12 py-4 text-lg"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Commencer le test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Page de quiz
  if (quizState === 'playing') {
    const question = questions[currentQuestion]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header avec progression */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-white">
                <span className="text-sm text-slate-400">Question</span>
                <span className="text-2xl font-bold ml-2">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className={getDifficultyColor(question.difficulty)}>
                  {question.difficulty}
                </Badge>
                <div className="flex items-center text-white">
                  <Clock className="h-5 w-5 mr-2 text-purple-400" />
                  <span className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-400' : ''}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                  {question.category}
                </Badge>
                <div className="text-slate-400 text-sm">
                  Score: {score}/{currentQuestion + (isAnswered ? 1 : 0)}
                </div>
              </div>
              <CardTitle className="text-2xl text-white leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Options de réponse */}
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  let buttonClass = "w-full p-4 text-left border-2 transition-all duration-300 "
                  
                  if (showExplanation) {
                    if (index === question.correctAnswer) {
                      buttonClass += "border-green-500 bg-green-500/20 text-green-300"
                    } else if (index === selectedAnswer && index !== question.correctAnswer) {
                      buttonClass += "border-red-500 bg-red-500/20 text-red-300"
                    } else {
                      buttonClass += "border-slate-600 bg-slate-700/30 text-slate-400"
                    }
                  } else {
                    if (selectedAnswer === index) {
                      buttonClass += "border-purple-500 bg-purple-500/20 text-white"
                    } else {
                      buttonClass += "border-slate-600 bg-slate-700/30 text-white hover:border-purple-400 hover:bg-purple-500/10"
                    }
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option}</span>
                        {showExplanation && index === question.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                        {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                    </Button>
                  )
                })}
              </div>

              {/* Explication */}
              {showExplanation && (
                <Card className="bg-slate-700/30 border-slate-600 mt-6">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Explication</h4>
                        <p className="text-slate-300">{question.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Bouton suivant */}
              {showExplanation && (
                <div className="text-center pt-6">
                  <Button 
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        Question suivante
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Voir les résultats
                        <Trophy className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Page des résultats
  if (quizState === 'finished') {
    const scoreLevel = getScoreLevel()
    const percentage = (score / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className={`h-20 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 ${scoreLevel.color}`}>
                {scoreLevel.icon}
              </div>
              <CardTitle className="text-4xl text-white mb-4">
                Quiz Terminé !
              </CardTitle>
              <CardDescription className="text-xl text-slate-300">
                Voici vos résultats et votre niveau évalué
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Score principal */}
              <div className="text-center bg-slate-700/30 rounded-lg p-8">
                <div className="text-6xl font-bold text-white mb-2">
                  {score}/{questions.length}
                </div>
                <div className="text-2xl text-slate-300 mb-4">
                  {percentage.toFixed(0)}% de réussite
                </div>
                <Badge className={`text-lg px-4 py-2 ${scoreLevel.color.replace('text-', 'bg-').replace('-400', '-500/20')} border-current`}>
                  Niveau: {scoreLevel.level}
                </Badge>
              </div>

              {/* Détail des réponses */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Détail des réponses</h3>
                <div className="space-y-3">
                  {questions.map((question, index) => {
                    const userAnswer = userAnswers[index]
                    const isCorrect = userAnswer === question.correctAnswer
                    const wasTimeout = userAnswer === -1

                    return (
                      <div key={question.id} className="bg-slate-700/30 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              isCorrect ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                              {isCorrect ? (
                                <CheckCircle className="h-5 w-5 text-white" />
                              ) : (
                                <XCircle className="h-5 w-5 text-white" />
                              )}
                            </div>
                            <span className="text-white font-medium">Question {index + 1}</span>
                          </div>
                          <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">{question.question}</p>
                        <div className="text-sm">
                          {wasTimeout ? (
                            <span className="text-red-400">Temps écoulé</span>
                          ) : (
                            <>
                              <span className="text-slate-400">Votre réponse: </span>
                              <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                                {question.options[userAnswer]}
                              </span>
                            </>
                          )}
                          {!isCorrect && (
                            <>
                              <br />
                              <span className="text-slate-400">Bonne réponse: </span>
                              <span className="text-green-400">{question.options[question.correctAnswer]}</span>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Refaire le test
                </Button>
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => router.push('/')}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Retour à l&apos;accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}