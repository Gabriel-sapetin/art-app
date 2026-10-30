import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import ShareArtworkModal from '../components/ShareArtworkModal';
import paleolithicImage from '../../assets/paleolithic.jpg';
import mesolithicImage from '../../assets/mesolithic.jpg';
import neolithicImage from '../../assets/neolithic.png';
import './StoneAgePage.css';

const periods = {
  paleolithic: {
    name: 'Paleolithic',
    years: 'Old Stone Age',
    technique: 'Percussion flaking',
    tool: 'Pebble chopper',
    striker: 'Hammerstone',
    image: paleolithicImage,
    imageAlt: 'Historical illustration of Paleolithic people hunting in open grassland.',
    summary: 'For much of this long era, people lived by hunting and gathering. Stoneworkers struck cores to detach sharp flakes for cutting and scraping.',
    simulationPurpose: 'Strike a stone core with a hammerstone, then use the shaped chopper to make a mark and see how flaking creates a useful edge.',
    action: 'Drag the hammerstone onto the core',
    made: 'You shaped a pebble chopper. A hammerstone detached the flakes; the chopper is the tool that can now scrape or strike a surface.',
  },
  mesolithic: {
    name: 'Mesolithic',
    years: 'Middle Stone Age',
    technique: 'Microlith assembly',
    tool: 'Composite microlith tool',
    image: mesolithicImage,
    imageAlt: 'Historical illustration of a Mesolithic community gathered at a rocky shelter.',
    summary: 'As climates and landscapes changed after the last Ice Age, many communities used small stone blades that could be fitted into wood or bone handles.',
    simulationPurpose: 'Fit three small blades into a haft to explore how replaceable stone inserts made a composite tool.',
    action: 'Fit three flakes into a haft',
    made: 'You assembled a composite tool by fitting small stone blades into a haft. These inserts could be replaced as they wore or broke.',
  },
  neolithic: {
    name: 'Neolithic',
    years: 'New Stone Age',
    technique: 'Grinding and polishing',
    tool: 'Polished stone axe',
    image: neolithicImage,
    imageAlt: 'Historical illustration of a Neolithic farming settlement beside fields and homes.',
    summary: 'In many regions, farming and settled communities grew. Ground and polished stone tools helped people shape wood and build.',
    simulationPurpose: 'Grind an axe edge smooth, then strike a timber log to see how a polished tool could work wood.',
    action: 'Grind the axe blank across the slab',
    made: 'You ground and polished a stone axe. Repeated abrasion can produce a smooth, durable working edge.',
  },
};

const toolMaterials = [
  { id: 'flint', name: 'Flint or chert', detail: 'Breaks into sharp-edged flakes.' },
  { id: 'quartzite', name: 'Quartzite', detail: 'Hard stone suited to repeated shaping.' },
];

function StrikingStone({ dragging = false, position = null }) {
  return (
    <svg className={`stone-age__striker-illustration ${dragging ? 'stone-age__drag-follow stone-age__drag-follow--hammer' : ''}`} style={dragging && position ? { left: position.x, top: position.y } : undefined} viewBox="0 0 120 76" role="img" aria-label="Hammerstone">
      <path d="M19 46 Q11 33 26 22 L45 14 Q58 11 67 20 Q84 14 96 26 Q108 38 98 51 Q91 63 73 60 L42 63 Q26 61 19 46Z" fill="#888176" stroke="#51483c" strokeWidth="4" />
      <path d="M27 34 Q43 18 60 22 L48 38Z" fill="#c1b7a2" opacity=".75" />
      <path d="M55 48 Q76 34 98 39" fill="none" stroke="#5d564c" strokeWidth="4" />
      <path d="M64 23 L74 37 L62 47" fill="none" stroke="#d5c7aa" strokeWidth="2" opacity=".75" />
    </svg>
  );
}

function NeolithicAxe({ passes = 0, dragging = false, position = null }) {
  const polished = passes >= 3;
  const headFill = passes === 0 ? '#938b7c' : passes < 3 ? '#a6a092' : '#c0bcae';
  return (
    <svg className={`stone-age__axe-illustration ${polished ? 'is-polished' : ''} ${dragging ? 'stone-age__drag-follow stone-age__drag-follow--axe' : ''}`} style={dragging && position ? { left: position.x, top: position.y } : undefined} viewBox="0 0 150 94" role="img" aria-label={polished ? 'Polished stone axe' : `Rough stone axe blank, ${passes} grinding passes`}>
      <path d="M75 31 L78 81 Q76 89 70 88 L64 83 L63 37Z" fill="#806447" stroke="#4c3b2c" strokeWidth="4" />
      {polished ? (
        <path d="M49 30 Q47 13 62 10 Q83 4 99 16 L112 25 Q114 37 105 48 Q91 55 72 51 Q53 48 49 30Z" fill={headFill} stroke="#51483c" strokeWidth="4" strokeLinejoin="round" />
      ) : (
        <path d="M49 12 L66 6 L89 10 L112 21 L108 48 L93 54 L72 51 L63 46 L46 37Z" fill={headFill} stroke="#51483c" strokeWidth="4" strokeLinejoin="round" />
      )}
      <path d="M53 15 Q70 10 88 16 L101 22 L85 28 L60 26Z" fill="#e8e1d1" opacity={.42 + passes * .12} />
      {passes < 4 && <g fill="none" stroke="#675f54" strokeLinecap="round" opacity={1 - passes * .2}><path d="M56 35 L67 31 M77 43 L91 39 M87 18 L98 22" strokeWidth="2" /></g>}
      {passes > 0 && <path d="M100 28 Q107 36 101 44" fill="none" stroke="#f2e8ce" strokeWidth={1 + passes} strokeLinecap="round" opacity={passes * .17} />}
    </svg>
  );
}

function TimberSample({ chops, impact }) {
  const broken = chops >= 3;
  return (
    <svg className={`stone-age__timber ${impact ? 'is-hit' : ''} ${broken ? 'is-split' : ''}`} viewBox="0 0 700 250" role="img" aria-label={broken ? 'A timber log split by the polished stone axe' : `Timber log, ${chops} of 3 axe cuts`}>
      <defs>
        <linearGradient id="timber-bark" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#97734e" /><stop offset=".5" stopColor="#684a33" /><stop offset="1" stopColor="#4e3929" /></linearGradient>
        <radialGradient id="timber-end"><stop stopColor="#d1b58a" /><stop offset=".72" stopColor="#a78358" /><stop offset="1" stopColor="#674a31" /></radialGradient>
      </defs>
      <g className="stone-age__log-body">
        <path d="M112 55 Q360 33 583 58 L583 186 Q352 208 112 183Z" fill="url(#timber-bark)" stroke="#493528" strokeWidth="7" />
        <ellipse cx="121" cy="119" rx="42" ry="66" fill="url(#timber-end)" stroke="#493528" strokeWidth="7" />
        <path d="M102 119 Q113 83 132 119 Q115 152 102 119Z M99 119 Q119 96 140 119 Q119 143 99 119Z" fill="none" stroke="#826244" strokeWidth="3" opacity=".85" />
        <path d="M190 70 Q260 57 328 72 M200 162 Q295 178 390 159 M360 61 Q438 75 533 66" fill="none" stroke="#c19a68" strokeWidth="4" opacity=".38" />
        <path d="M210 54 Q228 88 211 114 Q230 145 218 185 M426 51 Q407 90 430 122 Q405 153 418 193" fill="none" stroke="#34271f" strokeWidth="5" opacity=".35" />
        {chops >= 1 && <path d="M360 43 L348 73 L365 97" fill="none" stroke="#29231e" strokeWidth="8" strokeLinecap="round" />}
        {chops >= 2 && <path d="M348 73 L328 101 L351 125 L336 154" fill="none" stroke="#29231e" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />}
        {chops >= 3 && <path d="M328 101 L299 91 M351 125 L383 112 M336 154 L310 172" fill="none" stroke="#29231e" strokeWidth="8" strokeLinecap="round" />}
        {broken && <path d="M353 47 L344 82 L362 106 L344 131 L357 166 L340 193 L380 193 L364 165 L382 131 L365 106 L379 82 L368 47Z" fill="#39291d" stroke="#e3c99a" strokeWidth="4" strokeLinejoin="round" />}
      </g>
      <text x="350" y="232" textAnchor="middle" className="stone-age__timber-caption">{broken ? 'TIMBER SPLIT' : 'WOOD GRAIN · WORKING EDGE'}</text>
    </svg>
  );
}

function StoneCore({ progress, period, material }) {
  return (
    <svg className={`stone-core ${progress >= 4 ? 'is-broken' : ''}`} viewBox="0 0 480 330" role="img" aria-label={`${material} stone core, ${progress >= 4 ? 'broken into fragments' : `${progress} of 4 strikes`}`}>
      <defs>
        <linearGradient id="core-shade" x1="0" y1="0" x2="1" y2="1"><stop stopColor={material === 'flint' ? '#a7a19a' : '#b99b79'} /><stop offset="1" stopColor={material === 'flint' ? '#55524f' : '#665847'} /></linearGradient>
        <linearGradient id="fragment-shade" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b7b0a3" /><stop offset="1" stopColor="#625d55" /></linearGradient>
      </defs>
      {progress < 4 ? (
        <g className="stone-core__whole">
          <path d="M80 215 Q60 166 104 124 L135 70 Q164 50 197 68 Q233 38 274 72 Q327 61 350 105 Q405 123 395 174 Q424 210 386 250 Q370 286 322 278 Q286 309 244 281 Q201 302 167 274 Q116 282 102 248Z" fill="url(#core-shade)" stroke="#51483c" strokeWidth="5" />
          <path d="M105 164 Q172 114 238 118 Q313 108 373 162 Q333 139 282 154 Q208 174 138 214Z" fill="rgba(240,226,199,.28)" />
          <path d="M120 231 Q195 252 271 224 Q333 205 375 178" fill="none" stroke="rgba(48,39,31,.42)" strokeWidth="5" />
          {progress >= 1 && <path d="M249 86 L229 124 L248 148 L224 181" fill="none" stroke="#403832" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
          {progress >= 2 && <path d="M229 124 L185 117 L163 145 M248 148 L286 164 L314 149" fill="none" stroke="#403832" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
          {progress >= 3 && <path d="M224 181 L242 213 L220 242 M248 148 L262 194 L304 218 M185 117 L160 93 M314 149 L352 158" fill="none" stroke="#352d28" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      ) : (
        <g className="stone-core__fragments" fill="url(#fragment-shade)" stroke="#51483c" strokeWidth="5" strokeLinejoin="round">
          <path className="stone-core__fragment stone-core__fragment--one" d="M80 215 Q60 166 104 124 L135 70 Q164 50 197 68 L222 151 L184 197 Q127 192 80 215Z" />
          <path className="stone-core__fragment stone-core__fragment--two" d="M197 68 Q233 38 274 72 Q327 61 350 105 Q405 123 395 174 L329 198 L222 151Z" />
          <path className="stone-core__fragment stone-core__fragment--three" d="M80 215 L184 197 L222 151 L238 244 L201 302 Q167 274 167 274 Q116 282 102 248Z" />
          <path className="stone-core__fragment stone-core__fragment--four" d="M222 151 L329 198 L395 174 Q424 210 386 250 Q370 286 322 278 Q286 309 244 281 L238 244Z" />
          <path className="stone-core__fragment stone-core__fragment--chip" d="M104 215 L139 225 L117 260Z" />
        </g>
      )}
      {progress > 0 && progress < 4 && <g className="stone-core__ejected" fill="url(#fragment-shade)" stroke="#51483c" strokeWidth="2">{['M389 91l25 8-17 25z', 'M67 252l25-5-8 26z', 'M374 245l28 4-17 22z'].slice(0, progress).map((path, index) => <path key={path} d={path} className={`stone-core__chip stone-core__chip--${index + 1}`} />)}</g>}
      <text x="240" y="319" textAnchor="middle" className="stone-core__caption">{progress < 4 ? 'STONE CORE' : period === 'paleolithic' ? 'PEBBLE CHOPPER' : period === 'neolithic' ? 'BROKEN STONE' : 'SMALL STONE FLAKE'}</text>
    </svg>
  );
}

function CaveSurface({ marks, mode, onStart, onMove, onEnd, hasTool }) {
  return (
    <svg
      className="stone-cave-surface"
      viewBox="0 0 800 430"
      role="img"
      aria-label="Cave wall drawing surface. Draw with a mouse, touch, or stylus."
      onPointerDown={onStart}
      onPointerMove={onMove}
      onPointerUp={onEnd}
      onPointerCancel={onEnd}
      onLostPointerCapture={onEnd}
    >
      <defs>
        <linearGradient id="cave-wall" x2="0.2" y2="1"><stop stopColor="#6c5949" /><stop offset=".52" stopColor="#4b3d33" /><stop offset="1" stopColor="#332b27" /></linearGradient>
        <radialGradient id="cave-light"><stop stopColor="#8d7054" stopOpacity=".55" /><stop offset="1" stopColor="#302923" stopOpacity="0" /></radialGradient>
        <pattern id="cave-grain" width="42" height="38" patternUnits="userSpaceOnUse"><circle cx="5" cy="7" r="1.2" fill="#d0b991" opacity=".2" /><circle cx="28" cy="23" r="1" fill="#dbc8a6" opacity=".15" /><path d="M12 33l5-2" stroke="#241f1c" opacity=".18" /></pattern>
      </defs>
      <rect width="800" height="430" fill="url(#cave-wall)" />
      <ellipse cx="410" cy="190" rx="390" ry="260" fill="url(#cave-light)" />
      <path d="M0 0H122 Q86 73 104 125 Q61 172 89 228 Q42 298 96 430 H0Z M800 0H685 Q719 79 700 128 Q749 183 709 244 Q757 319 702 430 H800Z" fill="#282320" opacity=".6" />
      <rect width="800" height="430" fill="url(#cave-grain)" />
      <path d="M102 374 Q212 346 322 373 T548 372 T800 365" fill="none" stroke="#241e1a" strokeWidth="28" opacity=".42" />
      {marks.map((mark, index) => <path key={index} d={mark.d} fill="none" stroke={mark.color} strokeWidth={mark.width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={mark.mode === 'etch' ? '2 2' : undefined} opacity={mark.mode === 'etch' ? '.85' : '.94'} />)}
      {!marks.length && <text x="400" y="215" textAnchor="middle" className="stone-cave-surface__hint">{mode === 'etch' && !hasTool ? 'Shape a stone tool to begin engraving' : 'Press and drag here to leave a mark'}</text>}
      <rect className="stone-cave-surface__hit-area" width="800" height="430" fill="transparent" pointerEvents="none" />
    </svg>
  );
}

export default function StoneAgePage({ onArtworkShared }) {
  const [headerRef, headerVisible] = useInView();
  const [showShareModal, setShowShareModal] = useState(false);
  const [periodId, setPeriodId] = useState('paleolithic');
  const [materialId, setMaterialId] = useState('flint');
  const [progress, setProgress] = useState(0);
  const [microlithSlots, setMicrolithSlots] = useState([null, null, null]);
  const [selectedFlake, setSelectedFlake] = useState(null);
  const [microlithMessage, setMicrolithMessage] = useState('Select a flake, then choose a slot in the haft.');
  const [polishPasses, setPolishPasses] = useState(0);
  const [polishMessage, setPolishMessage] = useState('Drag the axe blank back and forth across the slab.');
  const [woodChops, setWoodChops] = useState(0);
  const [woodMessage, setWoodMessage] = useState('Drag or press the polished axe on the log to cut the timber.');
  const [marks, setMarks] = useState([]);
  const [mode, setMode] = useState('paint');
  const activeStroke = useRef(null);
  const coreRef = useRef(null);
  const abrasiveRef = useRef(null);
  const polishGesture = useRef(null);
  const timberRef = useRef(null);
  const axeGesture = useRef(null);
  const strikerDrag = useRef(null);
  const ignoreNextClick = useRef(false);
  const dragListeners = useRef(null);
  const [strikerPosition, setStrikerPosition] = useState(null);
  const [strikerDragging, setStrikerDragging] = useState(false);
  const [polisherDragging, setPolisherDragging] = useState(false);
  const [polisherPosition, setPolisherPosition] = useState(null);
  const [abrasiveFlash, setAbrasiveFlash] = useState(false);
  const [woodImpact, setWoodImpact] = useState(false);
  const [impact, setImpact] = useState(false);
  const [strikeMessage, setStrikeMessage] = useState('Drag the stone onto the core, or press it to strike.');
  useEffect(() => () => dragListeners.current?.cleanup(), []);

  const period = periods[periodId];
  const material = toolMaterials.find(item => item.id === materialId);
  const fittedFlakes = microlithSlots.filter(flake => flake !== null).length;
  const simulationProgress = periodId === 'paleolithic' ? progress : periodId === 'mesolithic' ? fittedFlakes : polishPasses;
  const hasTool = periodId === 'paleolithic'
    ? progress >= 4
    : periodId === 'mesolithic'
      ? fittedFlakes === 3
      : polishPasses >= 4;
  const firstStepTitle = periodId === 'paleolithic' ? 'Break the stone core' : periodId === 'mesolithic' ? 'Assemble the tool' : 'Polish the axe';
  const firstStepGuide = periodId === 'paleolithic' ? 'Strike the core with the hammerstone.' : periodId === 'mesolithic' ? 'Fit three small blades into the haft.' : 'Grind the axe blank across the slab.';
  const secondStepTitle = periodId === 'neolithic' ? 'Work the timber' : 'Make a mark';
  const secondStepGuide = periodId === 'neolithic' ? 'Use the finished axe on the log.' : 'Use pigment or your new tool on the cave wall.';
  const secondStepComplete = periodId === 'neolithic' ? woodChops >= 3 : marks.length > 0;
  const activityComplete = hasTool && secondStepComplete;
  const periodIds = Object.keys(periods);
  const currentPeriodIndex = periodIds.indexOf(periodId);
  const suggestedPeriodId = currentPeriodIndex < periodIds.length - 1 ? periodIds[currentPeriodIndex + 1] : periodIds[0];
  const suggestedPeriod = periods[suggestedPeriodId];

  const bindDragToWindow = (event, onMove, onFinish, onCancel) => {
    event.preventDefault();
    const pointerId = event.pointerId;
    const cleanup = () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleCancel);
      dragListeners.current = null;
    };
    const handleMove = (pointerEvent) => {
      if (pointerEvent.pointerId === pointerId) {
        pointerEvent.preventDefault();
        onMove(pointerEvent);
      }
    };
    const handleUp = (pointerEvent) => {
      if (pointerEvent.pointerId !== pointerId) return;
      cleanup();
      onFinish(pointerEvent);
    };
    const handleCancel = (pointerEvent) => {
      if (pointerEvent.pointerId !== pointerId) return;
      cleanup();
      onCancel();
    };
    dragListeners.current = { cleanup };
    window.addEventListener('pointermove', handleMove, { passive: false });
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleCancel);
  };

  const choosePeriod = (id) => {
    setPeriodId(id);
    setProgress(0);
    setMicrolithSlots([null, null, null]);
    setSelectedFlake(null);
    setMicrolithMessage('Select a flake, then choose a slot in the haft.');
    setPolishPasses(0);
    setPolishMessage('Drag the axe blank back and forth across the slab.');
    setWoodChops(0);
    setWoodMessage('Drag or press the polished axe on the log to cut the timber.');
    setMarks([]);
    setMode('paint');
    activeStroke.current = null;
    setStrikeMessage('Drag the stone onto the core, or press it to strike.');
  };

  const reset = () => {
    setProgress(0);
    setMicrolithSlots([null, null, null]);
    setSelectedFlake(null);
    setMicrolithMessage('Select a flake, then choose a slot in the haft.');
    setPolishPasses(0);
    setPolishMessage('Drag the axe blank back and forth across the slab.');
    setWoodChops(0);
    setWoodMessage('Drag or press the polished axe on the log to cut the timber.');
    setMarks([]);
    setMode('paint');
    activeStroke.current = null;
    setStrikeMessage('Drag the stone onto the core, or press it to strike.');
  };

  const strikeCore = () => {
    if (progress >= 4) return;
    const nextProgress = progress + 1;
    setProgress(nextProgress);
    setImpact(true);
    window.setTimeout(() => setImpact(false), 280);
    setStrikeMessage(nextProgress === 4 ? `The core breaks into fragments. ${period.tool} ready for the cave wall.` : `Strike ${nextProgress} of 4. A crack spreads and a chip breaks away.`);
  };

  const startStriker = (event) => {
    if (progress >= 4) return;
    strikerDrag.current = { startX: event.clientX, startY: event.clientY, moved: false };
    setStrikerDragging(true);
    setStrikerPosition({ x: event.clientX, y: event.clientY });
    bindDragToWindow(event, moveStriker, finishStriker, cancelStriker);
  };

  const moveStriker = (event) => {
    if (!strikerDrag.current) return;
    if (Math.hypot(event.clientX - strikerDrag.current.startX, event.clientY - strikerDrag.current.startY) > 8) strikerDrag.current.moved = true;
    setStrikerPosition({ x: event.clientX, y: event.clientY });
  };

  const finishStriker = (event) => {
    if (!strikerDrag.current) return;
    const drag = strikerDrag.current;
    const bounds = coreRef.current?.getBoundingClientRect();
    const landedOnCore = drag.moved && bounds && event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    if (drag.moved) {
      ignoreNextClick.current = true;
      window.setTimeout(() => { ignoreNextClick.current = false; }, 0);
      if (landedOnCore) strikeCore();
      else setStrikeMessage('The stone missed the core. Try dropping it on the stone.');
    }
    strikerDrag.current = null;
    setStrikerDragging(false);
    setStrikerPosition(null);
  };

  const cancelStriker = () => {
    strikerDrag.current = null;
    setStrikerDragging(false);
    setStrikerPosition(null);
  };

  const clickStriker = () => {
    if (ignoreNextClick.current) return;
    strikeCore();
  };

  const chopTimber = () => {
    if (woodChops >= 3) return;
    const next = woodChops + 1;
    setWoodChops(next);
    setWoodImpact(true);
    window.setTimeout(() => setWoodImpact(false), 300);
    setWoodMessage(next === 3 ? 'The log splits. The polished axe has worked through the timber.' : `Cut ${next} of 3. The split opens farther through the log.`);
  };

  const startWoodAxe = (event) => {
    if (woodChops >= 3) return;
    axeGesture.current = { startX: event.clientX, startY: event.clientY, moved: false };
    setPolisherDragging(true);
    setPolisherPosition({ x: event.clientX, y: event.clientY });
    bindDragToWindow(event, moveWoodAxe, finishWoodAxe, cancelWoodAxe);
  };

  const moveWoodAxe = (event) => {
    if (!axeGesture.current) return;
    if (Math.hypot(event.clientX - axeGesture.current.startX, event.clientY - axeGesture.current.startY) > 8) axeGesture.current.moved = true;
    setPolisherPosition({ x: event.clientX, y: event.clientY });
  };

  const finishWoodAxe = (event) => {
    if (!axeGesture.current) return;
    const gesture = axeGesture.current;
    const bounds = timberRef.current?.getBoundingClientRect();
    const landedOnLog = gesture.moved && bounds && event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    if (gesture.moved) {
      ignoreNextClick.current = true;
      window.setTimeout(() => { ignoreNextClick.current = false; }, 0);
      if (landedOnLog) chopTimber();
      else setWoodMessage('The axe missed the log. Drag it onto the timber to make a cut.');
    }
    axeGesture.current = null;
    setPolisherDragging(false);
    setPolisherPosition(null);
  };

  const cancelWoodAxe = () => {
    axeGesture.current = null;
    setPolisherDragging(false);
    setPolisherPosition(null);
  };

  const completePolishPass = () => {
    if (polishPasses >= 4) return;
    const next = polishPasses + 1;
    setPolishPasses(next);
    setAbrasiveFlash(true);
    window.setTimeout(() => setAbrasiveFlash(false), 260);
    setPolishMessage(next === 4 ? 'The axe edge is smooth and polished.' : `Grinding pass ${next} of 4. Keep moving the blank across the abrasive stone.`);
  };

  const placeMicrolith = (slotIndex) => {
    if (microlithSlots[slotIndex] !== null) return;
    if (selectedFlake === null) {
      setMicrolithMessage('Choose one of the stone flakes first.');
      return;
    }
    const nextSlots = microlithSlots.map((flake, index) => index === slotIndex ? selectedFlake : flake);
    setMicrolithSlots(nextSlots);
    setSelectedFlake(null);
    const fitted = nextSlots.filter(flake => flake !== null).length;
    setMicrolithMessage(fitted === 3 ? 'Composite tool assembled. The stone inserts are seated in the haft.' : `Flake fitted. ${3 - fitted} ${3 - fitted === 1 ? 'slot' : 'slots'} remain.`);
  };

  const startPolish = (event) => {
    polishGesture.current = { minX: event.clientX, maxX: event.clientX, minY: event.clientY, maxY: event.clientY, moved: false };
    setPolisherDragging(true);
    setPolisherPosition({ x: event.clientX, y: event.clientY });
    bindDragToWindow(event, movePolish, finishPolish, cancelPolish);
  };

  const movePolish = (event) => {
    if (!polishGesture.current) return;
    const gesture = polishGesture.current;
    gesture.minX = Math.min(gesture.minX, event.clientX);
    gesture.maxX = Math.max(gesture.maxX, event.clientX);
    gesture.minY = Math.min(gesture.minY, event.clientY);
    gesture.maxY = Math.max(gesture.maxY, event.clientY);
    if (gesture.maxX - gesture.minX > 8) gesture.moved = true;
    setPolisherPosition({ x: event.clientX, y: event.clientY });
  };

  const finishPolish = (event) => {
    if (!polishGesture.current) return;
    const gesture = polishGesture.current;
    const bounds = abrasiveRef.current?.getBoundingClientRect();
    const crossedSlab = bounds && event.clientY >= bounds.top && event.clientY <= bounds.bottom && gesture.maxX - gesture.minX >= bounds.width * 0.35;
    if (gesture.moved) {
      ignoreNextClick.current = true;
      window.setTimeout(() => { ignoreNextClick.current = false; }, 0);
    }
    if (gesture.moved && crossedSlab && polishPasses < 4) {
      completePolishPass();
    } else if (gesture.moved) {
      setPolishMessage('Move the axe back and forth across the slab before releasing.');
    }
    polishGesture.current = null;
    setPolisherDragging(false);
    setPolisherPosition(null);
  };

  const cancelPolish = () => {
    polishGesture.current = null;
    setPolisherDragging(false);
    setPolisherPosition(null);
  };

  const pointFor = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(800, ((event.clientX - rect.left) / rect.width) * 800)).toFixed(1),
      y: Math.max(0, Math.min(430, ((event.clientY - rect.top) / rect.height) * 430)).toFixed(1),
    };
  };

  const startMark = (event) => {
    if (mode === 'etch' && !hasTool) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = pointFor(event);
    const index = marks.length;
    const stroke = { d: `M${point.x} ${point.y}`, color: mode === 'paint' ? '#bd6540' : '#c2a881', width: mode === 'paint' ? 9 : 5, mode };
    activeStroke.current = { index, d: stroke.d };
    setMarks(current => [...current, stroke]);
  };

  const moveMark = (event) => {
    if (!activeStroke.current) return;
    const point = pointFor(event);
    activeStroke.current.d += ` L${point.x} ${point.y}`;
    const { index, d } = activeStroke.current;
    setMarks(current => current.map((mark, markIndex) => markIndex === index ? { ...mark, d } : mark));
  };

  const endMark = () => { activeStroke.current = null; };

  return (
    <section id="stone-age" className="stone-age section">
      <div className="container">
        <div ref={headerRef} className={`stone-age__header home__periods-header scroll-ease-in ${headerVisible ? 'visible' : ''}`}>
          <div className="home__periods-paper-pad">
            <img src="/assets/parchment-paper.avif" alt="" className="home__periods-paper-img" loading="lazy" />
            <div className="home__periods-paper-overlay" />
            <div className="home__periods-header-content">
              <h2 className="section-title">Stone Age: Toolmaking in Action</h2>
              <p className="section-subtitle">Try the stoneworking techniques that shaped life across three eras.</p>
              <div className="section-divider" />
            </div>
          </div>
        </div>

        <div className="stone-age__sheet">
          <div className="stone-age__periods" role="tablist" aria-label="Choose a Stone Age period">
            {Object.entries(periods).map(([id, item], index) => (
              <button key={id} type="button" role="tab" aria-selected={periodId === id} className={periodId === id ? 'active' : ''} onClick={() => choosePeriod(id)}>
                <span className="stone-age__period-index">0{index + 1}</span>
                <span><strong>{item.name}</strong><small>{item.years}</small></span>
              </button>
            ))}
          </div>

          <div className="stone-age__period-note">
            <figure className="stone-age__period-image">
              <img src={period.image} alt={period.imageAlt} loading="lazy" decoding="async" />
              <figcaption>0{currentPeriodIndex + 1} · {period.years}</figcaption>
            </figure>
            <div className="stone-age__period-story">
              <span className="plate-label">Selected period · {period.years}</span>
              <h3>{period.name}</h3>
              <p className="stone-age__period-summary">{period.summary}</p>
              <div className="stone-age__period-purpose">
                <span>What this simulation explores</span>
                <p>{period.simulationPurpose}</p>
              </div>
            </div>
          </div>

          <div className="stone-age__sequence" aria-label="Simulation steps">
            <div className={`stone-age__sequence-step ${hasTool ? 'complete' : 'current'}`} aria-current={!hasTool ? 'step' : undefined}>
              <span className="stone-age__sequence-number">01</span>
              <span className="stone-age__sequence-copy"><span className="stone-age__sequence-status">{hasTool ? 'Complete' : 'Start here'}</span><strong>{firstStepTitle}</strong><small>{firstStepGuide}</small></span>
            </div>
            <div className="stone-age__sequence-connector" aria-hidden="true" />
            <div className={`stone-age__sequence-step ${!hasTool ? 'locked' : secondStepComplete ? 'complete' : 'current'}`} aria-current={hasTool && !secondStepComplete ? 'step' : undefined}>
              <span className="stone-age__sequence-number">02</span>
              <span className="stone-age__sequence-copy"><span className="stone-age__sequence-status">{secondStepComplete ? 'Complete' : hasTool ? 'Next' : 'Locked'}</span><strong>{secondStepTitle}</strong><small>{hasTool ? secondStepGuide : 'Finish Step 1 to unlock this activity.'}</small></span>
            </div>
          </div>

          {activityComplete && <div className="stone-age__next-age" role="status">
            <div className="stone-age__next-age-copy">
              <span className="stone-age__next-age-label">Study complete</span>
              <strong>{period.name} toolmaking finished</strong>
              <p>{currentPeriodIndex < periodIds.length - 1 ? `Continue through the Stone Age and explore the ${suggestedPeriod.name} next.` : `Compare this polished axe with the earlier ${suggestedPeriod.name} stone-flaking study.`}</p>
            </div>
            <button type="button" className="stone-age__next-age-button" onClick={() => choosePeriod(suggestedPeriodId)}>{currentPeriodIndex < periodIds.length - 1 ? `Explore ${suggestedPeriod.name}` : `Compare with ${suggestedPeriod.name}`}</button>
          </div>}

          <div className="stone-age__steps">
            <section className="stone-age__tool-panel" aria-labelledby="tool-title">
              <div className="stone-age__panel-heading"><div><span className="stone-age__step-kicker">Step 1 · {periodId === 'paleolithic' ? 'Percussion flaking' : periodId === 'mesolithic' ? 'Composite toolmaking' : 'Grinding and polishing'}</span><h3 id="tool-title">{firstStepTitle}</h3></div><button type="button" className="stone-age__reset" onClick={reset}>Start over</button></div>

              {periodId === 'paleolithic' && <>
                <div className="stone-age__material" role="group" aria-label="Choose a stone material">
                  {toolMaterials.map(item => <button type="button" key={item.id} className={materialId === item.id ? 'active' : ''} onClick={() => { setMaterialId(item.id); setProgress(0); setMode('paint'); }}><strong>{item.name}</strong><span>{item.detail}</span></button>)}
                </div>
                <button type="button" className={`stone-age__striker ${strikerDragging ? 'is-dragging' : ''}`} onPointerDown={startStriker} onClick={clickStriker} disabled={hasTool} aria-label="Hammerstone. Drag onto the core, or press to strike.">
                  <StrikingStone dragging={strikerDragging} position={strikerPosition} />
                  <span><strong>Hammerstone</strong><small>{hasTool ? 'Pebble chopper shaped' : 'Drag onto the core to strike'}</small></span>
                </button>
                <div ref={coreRef} className={`stone-age__core-wrap ${impact ? 'is-struck' : ''} ${strikerDragging ? 'is-target' : ''}`}><StoneCore progress={progress} period={periodId} material={materialId} /></div>
                <div className="stone-age__progress" aria-label={`${progress} of 4 strikes complete`}><span style={{ width: `${progress * 25}%` }} /></div>
                <div className="stone-age__tool-footer"><span>{hasTool ? period.tool : `${period.technique} · ${progress} of 4 strikes`}</span><span aria-live="polite">{strikeMessage}</span></div>
              </>}

              {periodId === 'mesolithic' && <>
                <p className="stone-age__simulation-instruction">Choose a small blade, then fit it into an open groove in the wooden haft.</p>
                <div className="stone-age__haft" aria-label="Composite tool haft with three grooves">
                  <div className="stone-age__haft-handle" />
                  {microlithSlots.map((flake, index) => <button key={index} type="button" className={`stone-age__haft-slot ${flake !== null ? 'filled' : ''}`} onClick={() => placeMicrolith(index)} aria-label={flake !== null ? `Groove ${index + 1} has flake ${flake + 1}` : `Fit selected flake in groove ${index + 1}`}>
                    {flake !== null ? <span className={`stone-age__blade stone-age__blade--${flake + 1}`} /> : <span className="stone-age__empty-groove">Groove {index + 1}</span>}
                  </button>)}
                </div>
                <div className="stone-age__flake-tray" role="group" aria-label="Choose a microlith">
                  {['Pointed blade', 'Narrow blade', 'Scraper edge'].map((label, index) => <button key={label} type="button" className={selectedFlake === index ? 'selected' : ''} disabled={microlithSlots.some(flake => flake === index)} aria-pressed={selectedFlake === index} onClick={() => { setSelectedFlake(index); setMicrolithMessage(`${label} selected. Choose an open groove in the haft.`); }}><span className={`stone-age__flake stone-age__flake--${index + 1}`} /><strong>{label}</strong></button>)}
                </div>
                <div className="stone-age__progress" aria-label={`${fittedFlakes} of 3 microliths fitted`}><span style={{ width: `${(fittedFlakes / 3) * 100}%` }} /></div>
                <div className="stone-age__tool-footer"><span>{hasTool ? period.tool : `${fittedFlakes} of 3 stone inserts fitted`}</span><span aria-live="polite">{microlithMessage}</span></div>
              </>}

              {periodId === 'neolithic' && <>
                <p className="stone-age__simulation-instruction">Move the stone axe blank back and forth across the rough slab. Each full pass smooths its edge.</p>
                <div ref={abrasiveRef} className={`stone-age__abrasive ${abrasiveFlash ? 'is-ground' : ''}`}>
                  <div className="stone-age__abrasive-grain" />
                  <div className="stone-age__polish-lines" aria-hidden="true">{[0, 1, 2, 3].map(pass => <span key={pass} className={pass < polishPasses ? 'complete' : ''} />)}</div>
                  {!hasTool && <button type="button" className={`stone-age__polisher ${polisherDragging ? 'is-dragging' : ''}`} onPointerDown={startPolish} onClick={() => { if (!ignoreNextClick.current) completePolishPass(); }} aria-label="Stone axe blank. Drag it back and forth across the abrasive slab, or press to polish."><NeolithicAxe passes={polishPasses} dragging={polisherDragging} position={polisherPosition} /></button>}
                  {hasTool && <div className="stone-age__axe-finished"><NeolithicAxe passes={polishPasses} /><span>POLISHED EDGE</span></div>}
                  {!polisherDragging && <span className="stone-age__abrasive-hint">{hasTool ? 'Smooth edge · ready for woodworking' : 'Rough sandstone · move the axe across the slab'}</span>}
                </div>
                <div className="stone-age__progress" aria-label={`${polishPasses} of 4 grinding passes complete`}><span style={{ width: `${(polishPasses / 4) * 100}%` }} /></div>
                <div className="stone-age__tool-footer"><span>{hasTool ? period.tool : `${polishPasses} of 4 grinding passes`}</span><span aria-live="polite">{polishMessage}</span></div>
                <div className="stone-age__axe-lesson"><strong>Why polish the edge?</strong><p>Grinding removes rough high spots and leaves a smoother, durable cutting edge. That edge is useful for working timber.</p></div>
              </>}
            </section>

            {periodId === 'neolithic' ? (
              <section className="stone-age__wall-panel stone-age__wood-panel" aria-labelledby="timber-title">
                <div className="stone-age__panel-heading"><div><span className="stone-age__step-kicker">Step 2 · Put the edge to work</span><h3 id="timber-title">Work a timber log</h3></div><span className="stone-age__plate-label">{woodChops} of 3 cuts</span></div>
                <p className="stone-age__simulation-instruction">A ground stone axe could cut and shape wood. Finish polishing the axe, then strike the log and watch the split grow.</p>
                <div ref={timberRef} className={`stone-age__timber-stage ${woodImpact ? 'is-struck' : ''} ${!hasTool ? 'is-locked' : ''}`}>
                  <TimberSample chops={woodChops} impact={woodImpact} />
                  {!hasTool && <div className="stone-age__timber-lock">Polish the axe first to work the timber.</div>}
                  {woodChops >= 3 && <div className="stone-age__timber-result">The timber is split and ready to shape.</div>}
                </div>
                <div className="stone-age__wood-progress" aria-label={`${woodChops} of 3 axe cuts complete`}><span style={{ width: `${(woodChops / 3) * 100}%` }} /></div>
                <button type="button" className={`stone-age__wood-axe ${polisherDragging ? 'is-dragging' : ''}`} onPointerDown={startWoodAxe} onClick={() => { if (!ignoreNextClick.current) chopTimber(); }} disabled={!hasTool || woodChops >= 3} aria-label="Polished stone axe. Drag onto the log or press to strike it.">
                  <NeolithicAxe passes={polishPasses} dragging={polisherDragging} position={polisherPosition} />
                  <span><strong>Polished stone axe</strong><small>{hasTool ? 'Drag onto the log or press to cut' : 'Complete the grinding passes first'}</small></span>
                </button>
                <p className="stone-age__wall-hint" aria-live="polite">{woodMessage}</p>
              </section>
            ) : (
              <section className={`stone-age__wall-panel ${!hasTool ? 'is-step-locked' : ''}`} aria-labelledby="wall-title">
                <div className="stone-age__panel-heading">
                  <div>
                    <span className="stone-age__step-kicker">Step 2 · Make a mark</span>
                    <h3 id="wall-title">The cave wall</h3>
                  </div>
                  <div className="stone-age__wall-actions">
                    <button
                      type="button"
                      className="stone-age__share"
                      onClick={() => setShowShareModal(true)}
                      disabled={!marks.length}
                      title={!marks.length ? 'Draw on the cave wall first to share' : 'Share your cave painting to the community'}
                    >
                      <span>Share to Community</span>
                    </button>
                    <button
                      type="button"
                      className="stone-age__clear"
                      onClick={() => setMarks([])}
                      disabled={!marks.length}
                    >
                      Clear marks
                    </button>
                  </div>
                </div>
                <div className="stone-age__mark-tools" role="group" aria-label="Choose a mark-making technique">
                  <button type="button" className={mode === 'paint' ? 'active' : ''} aria-pressed={mode === 'paint'} disabled={!hasTool} onClick={() => setMode('paint')}><strong>Ochre pigment</strong><small>Paint a line</small></button>
                  <button type="button" className={mode === 'etch' ? 'active' : ''} aria-pressed={mode === 'etch'} disabled={!hasTool} onClick={() => setMode('etch')}><strong>{periodId === 'paleolithic' ? 'Pebble chopper' : 'Stone engraving'}</strong><small>Drag to scratch a line</small></button>
                </div>
                <div className="stone-age__wall">
                  <CaveSurface marks={marks} mode={mode} hasTool={hasTool} onStart={startMark} onMove={moveMark} onEnd={endMark} />
                  {!hasTool && <div className="stone-age__wall-lock">Start with Step 1. Finish shaping a tool to unlock the cave wall.</div>}
                </div>
                <p className="stone-age__wall-hint">Draw with a mouse, touch, or stylus. Try pigment and engraving to compare the marks.</p>
              </section>
            )}
          </div>

          <div className="stone-age__field-note"><span className="plate-label">Field note</span><p>{hasTool ? period.made : periodId === 'paleolithic' ? material.detail : periodId === 'mesolithic' ? 'Microliths are small stone pieces that could be fitted into composite tools.' : 'Grinding uses abrasion to smooth and shape a stone edge.'} {periodId === 'neolithic' ? (woodChops === 3 ? 'You split the timber with the finished edge.' : 'Use the finished edge on the timber sample.') : marks.length ? `You have left ${marks.length} ${marks.length === 1 ? 'mark' : 'marks'} on the wall.` : 'The surface keeps a record of each gesture you make.'}</p></div>
        </div>

        {/* Community Share Modal */}
        <ShareArtworkModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          marks={marks}
          periodId={periodId}
          mode={mode}
          onArtworkShared={onArtworkShared}
        />
      </div>
    </section>
  );
}
