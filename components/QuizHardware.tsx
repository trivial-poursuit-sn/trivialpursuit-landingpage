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
    category: "Hardware",
    question: "Comment se nomme la bobine accompagnant le primaire dans un transformateur ?",
    options: ["Secondaire", "Primaire", "Tertiaire", "Inductrice"],
    correctAnswer: 0,
    difficulty: "Intermédiaire",
    explanation: "Dans un transformateur, la bobine primaire est accompagnée d'une bobine secondaire, qui reçoit l'énergie par induction électromagnétique."
  },
  {
    id: 2,
    category: "Hardware",
    question: "Dans une alimentation, quel composant permet de lisser le signal ?",
    options: ["Diode", "Condensateur", "Résistance", "Transistor"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Le condensateur lisse le signal en stockant et relâchant l'énergie, réduisant les fluctuations du courant redressé."
  },
  {
    id: 3,
    category: "Hardware",
    question: "Dans une alimentation, quel composant permet de redresser le signal ?",
    options: ["Condensateur", "Diode", "Résistance", "Transformateur"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "La diode redresse le signal en convertissant le courant alternatif (AC) en courant continu (DC) grâce à son comportement unidirectionnel."
  },
  {
    id: 4,
    category: "Hardware",
    question: "Dans une maille, la somme de toutes les tensions de chaque dipôle linéaire est ?",
    options: ["Négative", "Positive", "Nulle", "Variable"],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Selon la loi des mailles de Kirchhoff, la somme des tensions dans une maille fermée est nulle, car l'énergie est conservée."
  },
  {
    id: 5,
    category: "Hardware",
    question: "Qu’est-ce qu’un Arduino ?",
    options: ["Un logiciel de simulation", "Une carte mère", "Un microcontrôleur open-source", "Un processeur graphique"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Un Arduino est une plateforme open-source avec un microcontrôleur programmable, utilisée pour des projets électroniques."
  },
  {
    id: 6,
    category: "Hardware",
    question: "Qu’est-ce qu’un dipôle actif dans un montage électronique ?",
    options: ["Un composant qui consomme de l'énergie", "Un composant qui génère de l'énergie", "Un composant sans connexion", "Un composant passif"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un dipôle actif, comme une pile ou un générateur, fournit de l'énergie au circuit, contrairement aux dipôles passifs."
  },
  {
    id: 7,
    category: "Hardware",
    question: "Qu’est-ce qu’un dipôle passif dans un montage électronique ?",
    options: ["Un composant qui génère de l'énergie", "Un composant qui consomme ou stocke l'énergie", "Un composant qui amplifie le signal", "Un composant programmable"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un dipôle passif, comme une résistance ou un condensateur, consomme ou stocke l'énergie sans la générer."
  },
  {
    id: 8,
    category: "Hardware",
    question: "Qu’est-ce qu’un relai ?",
    options: ["Un capteur de lumière", "Un interrupteur électromécanique", "Un amplificateur de signal", "Un microcontrôleur"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un relai est un interrupteur électromécanique qui utilise un électroaimant pour ouvrir ou fermer un circuit."
  },
  {
    id: 9,
    category: "Hardware",
    question: "Qu’est-ce qu’une entrée analogique ?",
    options: ["Un signal binaire", "Un signal continu variable", "Un signal numérique fixe", "Un signal amplifié"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Une entrée analogique est un signal continu qui peut prendre n'importe quelle valeur dans une plage, comme une tension variable."
  },
  {
    id: 10,
    category: "Hardware",
    question: "Qu’est-ce qu’une entrée numérique ?",
    options: ["Un signal continu", "Un signal binaire (0 ou 1)", "Un signal amplifié", "Un signal modulé"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Une entrée numérique est un signal binaire qui ne peut prendre que deux états : 0 (bas) ou 1 (haut)."
  },
  {
    id: 11,
    category: "Hardware",
    question: "Que se passe-t-il quand deux résistances sont en parallèle ?",
    options: ["La résistance totale augmente", "La résistance totale diminue", "La tension augmente", "Le courant diminue"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "En parallèle, la résistance totale est calculée par 1/Rt = 1/R1 + 1/R2, ce qui réduit la résistance totale."
  },
  {
    id: 12,
    category: "Hardware",
    question: "Que se passe-t-il quand deux résistances sont en série ?",
    options: ["La résistance totale diminue", "La résistance totale augmente", "La tension diminue", "Le courant augmente"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "En série, la résistance totale est la somme des résistances (Rt = R1 + R2), ce qui augmente la résistance totale."
  },
  {
    id: 13,
    category: "Hardware",
    question: "Que signifie l’acronyme LED ?",
    options: ["Light Emitting Device", "Light Emitting Diode", "Low Energy Display", "Linear Electronic Diode"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "LED signifie 'Light Emitting Diode' (diode électroluminescente), un composant qui émet de la lumière lorsqu'il est polarisé."
  },
  {
    id: 14,
    category: "Hardware",
    question: "Quel composant permet de protéger une LED sur un circuit ?",
    options: ["Condensateur", "Résistance", "Diode", "Transistor"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Une résistance en série limite le courant traversant la LED, la protégeant contre une surcharge."
  },
  {
    id: 15,
    category: "Hardware",
    question: "Quel est le but de l'Arduino ?",
    options: ["Jouer à des jeux vidéo", "Programmer des microcontrôleurs", "Amplifier des signaux", "Créer des réseaux"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "L'Arduino est conçu pour programmer des microcontrôleurs afin de réaliser des projets électroniques interactifs."
  },
  {
    id: 16,
    category: "Hardware",
    question: "Quel est le langage utilisé par Arduino ?",
    options: ["Python", "C/C++", "Java", "JavaScript"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "L'Arduino utilise un langage basé sur C/C++, simplifié pour programmer facilement ses microcontrôleurs."
  },
  {
    id: 17,
    category: "Hardware",
    question: "Quel rôle peut avoir un transistor dans un montage électronique ?",
    options: ["Filtrer le signal", "Amplifier ou commuter", "Stocker l'énergie", "Convertir le courant"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Un transistor peut agir comme un amplificateur de signal ou un interrupteur électronique dans un circuit."
  },
  {
    id: 18,
    category: "Hardware",
    question: "Quelle grandeur physique est calculée par un diviseur de tension ?",
    options: ["Courant", "Résistance", "Tension", "Puissance"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Un diviseur de tension utilise des résistances pour répartir une tension d'entrée en tensions partielles proportionnelles."
  },
  {
    id: 19,
    category: "Hardware",
    question: "Qu'est-ce que l'anode d'une diode ?",
    options: ["La borne négative", "La borne positive", "La borne de contrôle", "La borne de sortie"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "L'anode est la borne positive d'une diode, où le courant entre lorsque la diode est polarisée en direct."
  },
  {
    id: 20,
    category: "Hardware",
    question: "Qui a créé l'Arduino ?",
    options: ["Elon Musk", "Massimo Banzi", "Bill Gates", "Steve Wozniak"],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Massimo Banzi, avec son équipe, a créé la plateforme Arduino en 2005 pour rendre l'électronique accessible."
  },
  {
    id: 21,
    category: "Hardware",
    question: "Sur une résistance à 4 anneaux, à quoi correspond le second anneau ?",
    options: ["Multiplicateur", "Tolérance", "Deuxième chiffre", "Première couleur"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Sur une résistance à 4 anneaux, le second anneau représente le deuxième chiffre de la valeur de la résistance."
  },
  {
    id: 22,
    category: "Hardware",
    question: "Quel est le rôle du processeur (CPU) dans un ordinateur ?",
    options: ["Afficher les images", "Sauvegarder les fichiers", "Exécuter les instructions et les calculs", "Fournir de l’énergie"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Le processeur (CPU) est le cerveau de l'ordinateur, chargé d'exécuter les instructions et d'effectuer les calculs nécessaires au fonctionnement des programmes."
  },
  {
    id: 23,
    category: "Hardware",
    question: "Quelle unité mesure la fréquence d’un processeur ?",
    options: ["Volt", "Hertz", "Gigahertz (GHz)", "Octets"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "La fréquence d’un processeur est mesurée en Gigahertz (GHz), une unité dérivée du Hertz, qui indique le nombre de cycles par seconde."
  },
  {
    id: 24,
    category: "Hardware",
    question: "Quelle est la fonction principale de la RAM ?",
    options: ["Alimenter l’écran", "Stocker définitivement les fichiers", "Stocker temporairement les données en cours d’utilisation", "Gérer la ventilation"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "La RAM (Random Access Memory) stocke temporairement les données utilisées par le processeur pour un accès rapide pendant l'exécution des programmes."
  },
  {
    id: 25,
    category: "Hardware",
    question: "Quel périphérique permet d’afficher des images à l’utilisateur ?",
    options: ["Clavier", "Écran (moniteur)", "Disque dur", "Carte son"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "L’écran (moniteur) est le périphérique principal qui affiche les images et les informations visuelles à l’utilisateur."
  },
  {
    id: 26,
    category: "Hardware",
    question: "Quel composant stocke les données de manière permanente ?",
    options: ["RAM", "Disque dur (HDD ou SSD)", "Carte graphique", "Processeur"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Le disque dur (HDD ou SSD) stocke les données de manière permanente, même lorsque l’ordinateur est éteint, contrairement à la RAM."
  },
  {
    id: 27,
    category: "Hardware",
    question: "Que signifie l’acronyme 'SSD' ?",
    options: ["Simple Storage Device", "Solid State Drive", "Soft Speed Drive", "Serial Storage Disk"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "SSD signifie 'Solid State Drive', un type de stockage sans pièces mobiles, plus rapide qu’un disque dur traditionnel (HDD)."
  },
  {
    id: 28,
    category: "Hardware",
    question: "Quel composant est utilisé pour refroidir le processeur ?",
    options: ["Carte réseau", "Ventilateur / système de refroidissement (ventirad)", "Batterie", "Alimentation"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "Un ventilateur ou un système de refroidissement (ventirad) est utilisé pour dissiper la chaleur générée par le processeur."
  },
  {
    id: 29,
    category: "Hardware",
    question: "Quel périphérique est utilisé pour saisir du texte ?",
    options: ["Écran", "Souris", "Clavier", "Webcam"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "Le clavier est le périphérique principal utilisé pour saisir du texte et des commandes dans un ordinateur."
  },
  {
    id: 30,
    category: "Hardware",
    question: "Quel est le rôle de la carte mère ?",
    options: ["Refroidir les composants", "Gérer l'affichage", "Connecter tous les composants entre eux", "Alimenter l'écran"],
    correctAnswer: 2,
    difficulty: "Débutant",
    explanation: "La carte mère est la plateforme centrale qui connecte tous les composants d’un ordinateur, permettant leur communication."
  },
  {
    id: 31,
    category: "Hardware",
    question: "Que fait une carte graphique ?",
    options: ["Stocke des données", "Gère l’affichage des images et vidéos", "Fournit du son", "Améliore la vitesse Internet"],
    correctAnswer: 1,
    difficulty: "Débutant",
    explanation: "La carte graphique (GPU) est responsable du rendu des images, vidéos et animations affichées à l’écran."
  },
  {
    id: 32,
    category: "Hardware",
    question: "Quelle est la différence entre un SSD et un HDD ?",
    options: ["Le HDD est plus rapide", "Le SSD utilise un disque mécanique", "Le SSD est plus rapide et sans pièces mobiles", "Ils sont identiques"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Un SSD est plus rapide et utilise de la mémoire flash sans pièces mobiles, contrairement au HDD qui repose sur des disques mécaniques."
  },
  {
    id: 33,
    category: "Hardware",
    question: "Quelle est la principale fonction de l’alimentation (PSU) ?",
    options: ["Fournir de l’électricité aux composants", "Refroidir l’ordinateur", "Stocker les logiciels", "Transmettre les données"],
    correctAnswer: 0,
    difficulty: "Intermédiaire",
    explanation: "L’alimentation (PSU, Power Supply Unit) fournit l’électricité nécessaire au fonctionnement de tous les composants de l’ordinateur."
  },
  {
    id: 34,
    category: "Hardware",
    question: "Quel port est utilisé pour connecter une souris USB ?",
    options: ["HDMI", "RJ45", "USB", "VGA"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Le port USB est utilisé pour connecter des périphériques comme une souris ou un clavier à un ordinateur."
  },
  {
    id: 35,
    category: "Hardware",
    question: "Quel composant est responsable du traitement graphique dans les jeux vidéo ?",
    options: ["CPU", "GPU (carte graphique)", "RAM", "Disque dur"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "Le GPU (Graphics Processing Unit) est spécialisé dans le traitement des calculs graphiques nécessaires aux jeux vidéo."
  },
  {
    id: 36,
    category: "Hardware",
    question: "Comment s’appelle le boîtier qui contient tous les composants d’un ordinateur de bureau ?",
    options: ["Moniteur", "Unité centrale (ou tour)", "Switch", "Scanner"],
    correctAnswer: 1,
    difficulty: "Intermédiaire",
    explanation: "L’unité centrale (ou tour) est le boîtier qui abrite tous les composants principaux d’un ordinateur de bureau."
  },
  {
    id: 37,
    category: "Hardware",
    question: "Quel composant contient le BIOS ou l’UEFI ?",
    options: ["RAM", "Carte graphique", "Carte mère", "Disque dur"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "Le BIOS ou l’UEFI est stocké sur une puce de la carte mère, gérant l’initialisation du matériel au démarrage."
  },
  {
    id: 38,
    category: "Hardware",
    question: "Quelle est la différence entre HDMI et VGA ?",
    options: ["HDMI transmet l’image et le son, VGA seulement l’image", "VGA est plus récent", "HDMI est un format de disque dur", "VGA est numérique, HDMI est analogique"],
    correctAnswer: 0,
    difficulty: "Intermédiaire",
    explanation: "HDMI transmet à la fois l’image et le son en numérique, tandis que VGA transmet uniquement l’image en analogique."
  },
  {
    id: 39,
    category: "Hardware",
    question: "Quel type de mémoire est effacée à chaque redémarrage de l’ordinateur ?",
    options: ["SSD", "Disque dur", "RAM", "Carte graphique"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "La RAM est une mémoire volatile qui perd toutes ses données lorsque l’ordinateur est redémarré."
  },
  {
    id: 40,
    category: "Hardware",
    question: "Quelle unité mesure la capacité d’un disque dur ?",
    options: ["Hertz", "Watts", "Pixels", "Gigaoctets (Go)"],
    correctAnswer: 3,
    difficulty: "Intermédiaire",
    explanation: "La capacité d’un disque dur est mesurée en gigaoctets (Go) ou téraoctets (To), unités de stockage de données."
  },
  {
    id: 41,
    category: "Hardware",
    question: "Quel composant est crucial pour le bon fonctionnement des logiciels lourds comme les jeux ou le montage vidéo ?",
    options: ["Carte réseau", "Alimentation", "Carte graphique (GPU)", "Lecteur DVD"],
    correctAnswer: 2,
    difficulty: "Intermédiaire",
    explanation: "La carte graphique (GPU) est essentielle pour les tâches gourmandes en calculs graphiques, comme les jeux ou le montage vidéo."
  },
  {
    id: 42,
    category: "Hardware",
    question: "Quel port est utilisé pour brancher un écran moderne ?",
    options: ["RJ45", "USB", "HDMI", "SATA"],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Le port HDMI est couramment utilisé pour connecter des écrans modernes, transmettant image et son en haute qualité."
  },
  {
    id: 43,
    category: "Hardware",
    question: "Qu’est-ce qu’un bus sur une carte mère ?",
    options: ["Un système de refroidissement", "Un circuit de transmission des données entre composants", "Une alimentation secondaire", "Un type de disque"],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Le bus est un système de communication sur la carte mère permettant le transfert de données entre les composants."
  },
  {
    id: 44,
    category: "Hardware",
    question: "Quelle est la fonction du chipset sur une carte mère ?",
    options: ["Augmenter le son", "Refroidir le CPU", "Gérer la communication entre les composants", "Alimenter le disque dur"],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Le chipset gère la communication entre le CPU, la RAM, le stockage et autres périphériques sur la carte mère."
  },
  {
    id: 45,
    category: "Hardware",
    question: "Qu’est-ce qu’un socket (dans le contexte du CPU) ?",
    options: ["Un câble d’alimentation", "Une mémoire externe", "Le support où l’on place le processeur sur la carte mère", "Un type de ventilateur"],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "Le socket est l’emplacement physique sur la carte mère où le processeur est inséré pour établir la connexion."
  },
  {
    id: 46,
    category: "Hardware",
    question: "Qu’est-ce qu’un overclocking ?",
    options: ["Réduire la vitesse du processeur", "Augmenter volontairement la fréquence du processeur", "Supprimer le système d’exploitation", "Refroidir le processeur"],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "L’overclocking consiste à augmenter la fréquence du processeur au-delà des spécifications d’usine pour améliorer les performances."
  },
  {
    id: 47,
    category: "Hardware",
    question: "Qu’est-ce que le format ATX ?",
    options: ["Une norme de carte graphique", "Un protocole de réseau", "Une norme de format de carte mère", "Une unité de mesure de données"],
    correctAnswer: 2,
    difficulty: "Avancé",
    explanation: "ATX (Advanced Technology eXtended) est une norme définissant le format et les spécifications des cartes mères."
  },
  {
    id: 48,
    category: "Hardware",
    question: "Quel est le rôle du dissipateur thermique ?",
    options: ["Connecter les câbles", "Dissiper la chaleur d’un composant comme le CPU ou GPU", "Stocker les jeux", "Accélérer Internet"],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Le dissipateur thermique absorbe et disperse la chaleur générée par des composants comme le CPU ou le GPU pour éviter la surchauffe."
  },
  {
    id: 49,
    category: "Hardware",
    question: "Que signifie l’acronyme GPU ?",
    options: ["General Processing Unit", "Graphics Processing Unit", "Gigabyte Power Unit", "Graphical Performance Utility"],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "GPU signifie 'Graphics Processing Unit', un composant spécialisé dans le traitement des calculs graphiques."
  },
  {
    id: 50,
    category: "Hardware",
    question: "Qu’est-ce qu’un lecteur optique ?",
    options: ["Un capteur de lumière", "Un lecteur de CD/DVD", "Un convertisseur audio", "Un type de mémoire RAM"],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "Un lecteur optique lit et écrit des données sur des disques optiques comme les CD ou DVD à l’aide d’un laser."
  },
  {
    id: 51,
    category: "Hardware",
    question: "Pourquoi utilise-t-on de la pâte thermique sur un processeur ?",
    options: ["Pour le nettoyer", "Pour améliorer le transfert de chaleur entre le processeur et le ventirad", "Pour le fixer", "Pour accélérer les calculs"],
    correctAnswer: 1,
    difficulty: "Avancé",
    explanation: "La pâte thermique améliore le transfert de chaleur entre le processeur et le dissipateur thermique (ventirad) pour une meilleure dissipation."
  }
]

type QuizState = 'start' | 'playing' | 'finished'

export default function QuizSoloHardware() {
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
    setSelectedAnswer(-1)
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
                Test de Niveau - Hardware
              </CardTitle>
              <CardDescription className="text-lg text-slate-300 max-w-2xl mx-auto">
                Prêt à tester tes skills en hardware ? Ce quiz ultime avec 51 questions va évaluer ton savoir sur les composants électroniques et l&apos;Arduino. Go all in !
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Durée</h3>
                  <p className="text-slate-300">30 sec/question</p>
                </div>
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Questions</h3>
                  <p className="text-slate-300">51 questions</p>
                </div>
                <div className="text-center p-6 bg-slate-700/30 rounded-lg">
                  <Award className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Évaluation</h3>
                  <p className="text-slate-300">Niveau personnalisé</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Domaine couvert
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                    Hardware
                  </Badge>
                </div>
              </div>

              <div className="text-center pt-6">
                <Button 
                  onClick={startQuiz}
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-12 py-4 text-lg"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Lancer le quiz
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
                Voilà ton score et ton niveau en hardware !
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
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

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Refaire le quiz
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